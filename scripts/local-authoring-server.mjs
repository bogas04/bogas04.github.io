import { createServer } from "node:http";
import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

import next from "next";

import { MAX_SOURCE_BYTES } from "./gallery-lib.ts";
import { OPTIMIZATION_VERSION, optimizeImage } from "./image-optimizer.ts";

const hostname = "127.0.0.1";
const port = Number(process.env.PORT || 3000);
const MAX_CONCURRENT_TRANSFORMS = 4;
const OPTIMIZE_PATH = "/api/local-image-optimizer";
const LINK_PREVIEW_PATH = "/api/local-link-preview";
const MAX_LINK_PREVIEW_BYTES = 1_000_000;

let activeTransforms = 0;
const transformQueue = [];

function runTransform(task) {
  return new Promise((resolve, reject) => {
    const run = async () => {
      activeTransforms += 1;
      try {
        resolve(await task());
      } catch (error) {
        reject(error);
      } finally {
        activeTransforms -= 1;
        transformQueue.shift()?.();
      }
    };
    if (activeTransforms < MAX_CONCURRENT_TRANSFORMS) void run();
    else transformQueue.push(() => void run());
  });
}

async function readBody(request) {
  const declaredLength = Number(request.headers["content-length"] || 0);
  if (declaredLength > MAX_SOURCE_BYTES) throw new Error("Image exceeds the 25 MiB source limit.");
  const chunks = [];
  let length = 0;
  for await (const chunk of request) {
    length += chunk.length;
    if (length > MAX_SOURCE_BYTES) throw new Error("Image exceeds the 25 MiB source limit.");
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

async function optimize(request, response) {
  if (request.method !== "POST") {
    response.writeHead(405, { Allow: "POST" }).end();
    return;
  }
  try {
    const source = await readBody(request);
    const output = await runTransform(() => optimizeImage(source));
    response.writeHead(200, {
      "Content-Type": "image/jpeg",
      "Content-Length": output.data.length,
      "X-Image-Width": String(output.width),
      "X-Image-Height": String(output.height),
      "X-Image-Optimization-Version": OPTIMIZATION_VERSION,
    });
    response.end(output.data);
  } catch (error) {
    response.writeHead(422, { "Content-Type": "text/plain; charset=utf-8" });
    response.end(error instanceof Error ? error.message : "Could not optimize this image.");
  }
}

function sendJson(response, status, body) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(body));
}

function isPrivateAddress(address) {
  if (isIP(address) === 4) {
    const [first, second] = address.split(".").map(Number);
    return first === 10 || first === 127 || first === 0 || first >= 224
      || (first === 169 && second === 254)
      || (first === 172 && second >= 16 && second <= 31)
      || (first === 192 && second === 168);
  }
  const normalized = address.toLowerCase();
  return normalized === "::1" || normalized.startsWith("fc") || normalized.startsWith("fd") || normalized.startsWith("fe80:");
}

async function assertPublicUrl(url) {
  if (url.protocol !== "http:" && url.protocol !== "https:") throw new Error("Only http and https links can be previewed.");
  const hostname = url.hostname.toLowerCase();
  if (hostname === "localhost" || hostname.endsWith(".localhost") || hostname.endsWith(".local")) {
    throw new Error("Local network links cannot be previewed.");
  }
  const addresses = isIP(hostname) ? [{ address: hostname }] : await lookup(hostname, { all: true, verbatim: true });
  if (addresses.length === 0 || addresses.some(({ address }) => isPrivateAddress(address))) {
    throw new Error("Private network links cannot be previewed.");
  }
}

function attribute(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"));
  return match?.[1] || match?.[2] || match?.[3] || "";
}

function compactText(value) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().slice(0, 500);
}

function metadataFromHtml(html, url) {
  const metadata = [...html.matchAll(/<meta\b[^>]*>/gi)].reduce((values, match) => {
    const tag = match[0];
    const key = (attribute(tag, "property") || attribute(tag, "name")).toLowerCase();
    if (key) values.set(key, attribute(tag, "content"));
    return values;
  }, new Map());
  const titleTag = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "";
  const title = compactText(metadata.get("og:title") || metadata.get("twitter:title") || titleTag || url.hostname);
  const description = compactText(metadata.get("og:description") || metadata.get("twitter:description") || metadata.get("description") || "");
  const imageValue = metadata.get("og:image") || metadata.get("twitter:image");
  let image = null;
  if (imageValue) {
    try {
      image = new URL(imageValue, url).href;
    } catch {
      image = null;
    }
  }
  return { url: url.href, title, description, image };
}

async function createLinkPreview(rawUrl) {
  let url = new URL(rawUrl);
  for (let redirectCount = 0; redirectCount < 5; redirectCount += 1) {
    await assertPublicUrl(url);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8_000);
    try {
      const response = await fetch(url, {
        redirect: "manual",
        signal: controller.signal,
        headers: { "User-Agent": "bogas04-local-authoring-preview/1.0" },
      });
      if (response.status >= 300 && response.status < 400 && response.headers.get("location")) {
        url = new URL(response.headers.get("location"), url);
        continue;
      }
      if (!response.ok) throw new Error(`The link returned HTTP ${response.status}.`);
      const contentType = response.headers.get("content-type") || "";
      const contentLength = Number(response.headers.get("content-length") || 0);
      if (!contentType.includes("text/html")) throw new Error("That link is not an HTML page.");
      if (contentLength > MAX_LINK_PREVIEW_BYTES) throw new Error("That page is too large to preview.");
      const preview = metadataFromHtml((await response.text()).slice(0, MAX_LINK_PREVIEW_BYTES), url);
      if (preview.image) {
        try {
          await assertPublicUrl(new URL(preview.image));
        } catch {
          preview.image = null;
        }
      }
      return preview;
    } finally {
      clearTimeout(timeout);
    }
  }
  throw new Error("The link redirected too many times.");
}

async function previewLink(request, response) {
  if (request.method !== "POST") {
    response.writeHead(405, { Allow: "POST" }).end();
    return;
  }
  try {
    const { url } = JSON.parse((await readBody(request)).toString("utf8"));
    if (typeof url !== "string" || url.length > 2_000) throw new Error("Paste one complete URL.");
    sendJson(response, 200, await createLinkPreview(url));
  } catch (error) {
    sendJson(response, 422, { error: error instanceof Error ? error.message : "Could not create a link preview." });
  }
}

const app = next({ dev: true, hostname, port });
const handle = app.getRequestHandler();

await app.prepare();
const server = createServer((request, response) => {
  if (request.url?.split("?")[0] === OPTIMIZE_PATH) {
    void optimize(request, response);
    return;
  }
  if (request.url?.split("?")[0] === LINK_PREVIEW_PATH) {
    void previewLink(request, response);
    return;
  }
  void handle(request, response);
});

server.listen(port, hostname, () => {
  console.log(`- Local: http://${hostname}:${port}`);
  console.log(`Local image optimizer: ${MAX_CONCURRENT_TRANSFORMS} concurrent Sharp transforms.`);
});

let shuttingDown = false;

async function shutdown(signal) {
  if (shuttingDown) return;
  shuttingDown = true;
  console.log(`Received ${signal}; stopping local authoring server...`);

  const forceExit = setTimeout(() => process.exit(1), 5_000);
  forceExit.unref();

  try {
    const closed = new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
    server.closeAllConnections?.();
    await closed;
    await app.close();
    process.exit(0);
  } catch (error) {
    console.error("Could not stop the local authoring server cleanly:", error);
    process.exit(1);
  } finally {
    clearTimeout(forceExit);
  }
}

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.once(signal, () => void shutdown(signal));
}
