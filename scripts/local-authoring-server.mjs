import { createServer } from "node:http";

import next from "next";

import { MAX_SOURCE_BYTES } from "./gallery-lib.ts";
import { OPTIMIZATION_VERSION, optimizeImage } from "./image-optimizer.ts";

const hostname = "127.0.0.1";
const port = Number(process.env.PORT || 3000);
const MAX_CONCURRENT_TRANSFORMS = 4;
const OPTIMIZE_PATH = "/api/local-image-optimizer";

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

const app = next({ dev: true, hostname, port });
const handle = app.getRequestHandler();

await app.prepare();
const server = createServer((request, response) => {
  if (request.url?.split("?")[0] === OPTIMIZE_PATH) {
    void optimize(request, response);
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
