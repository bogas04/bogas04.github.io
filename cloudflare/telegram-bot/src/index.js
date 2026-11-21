const WEBHOOK_PATH = "/telegram/webhook";
const MAX_TELEGRAM_FILE_BYTES = 20 * 1024 * 1024;
const MAX_IMAGE_EDGE = 1440;

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

function base64Url(bytes) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function derLength(length) {
  if (length < 128) return Uint8Array.of(length);
  const bytes = [];
  let rest = length;
  while (rest > 0) {
    bytes.unshift(rest & 255);
    rest >>>= 8;
  }
  return Uint8Array.of(0x80 | bytes.length, ...bytes);
}

function der(tag, content) {
  const length = derLength(content.length);
  const result = new Uint8Array(1 + length.length + content.length);
  result[0] = tag;
  result.set(length, 1);
  result.set(content, 1 + length.length);
  return result;
}

function concatBytes(...parts) {
  const result = new Uint8Array(parts.reduce((sum, part) => sum + part.length, 0));
  let offset = 0;
  for (const part of parts) {
    result.set(part, offset);
    offset += part.length;
  }
  return result;
}

function pemPkcs1ToPkcs8(pem) {
  const raw = pem
    .replace(/-----BEGIN RSA PRIVATE KEY-----/g, "")
    .replace(/-----END RSA PRIVATE KEY-----/g, "")
    .replace(/\s/g, "");
  const pkcs1 = Uint8Array.from(atob(raw), (char) => char.charCodeAt(0));
  const algorithm = der(0x30, Uint8Array.of(0x06, 0x09, 0x2a, 0x86, 0x48, 0x86, 0xf7, 0x0d, 0x01, 0x01, 0x01, 0x05, 0x00));
  return der(0x30, concatBytes(der(0x02, Uint8Array.of(0)), algorithm, der(0x04, pkcs1)));
}

async function githubJwt(env) {
  const now = Math.floor(Date.now() / 1000);
  const head = base64Url(new TextEncoder().encode(JSON.stringify({ alg: "RS256", typ: "JWT" })));
  const body = base64Url(new TextEncoder().encode(JSON.stringify({
    iat: now - 30,
    exp: now + 8 * 60,
    iss: env.GITHUB_APP_ID,
  })));
  const unsigned = `${head}.${body}`;
  const key = await crypto.subtle.importKey(
    "pkcs8",
    pemPkcs1ToPkcs8(env.GITHUB_APP_PRIVATE_KEY),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, new TextEncoder().encode(unsigned));
  return `${unsigned}.${base64Url(new Uint8Array(signature))}`;
}

async function githubToken(env) {
  const jwt = await githubJwt(env);
  const response = await fetch(`https://api.github.com/app/installations/${env.GITHUB_INSTALLATION_ID}/access_tokens`, {
    method: "POST",
    headers: {
      accept: "application/vnd.github+json",
      authorization: `Bearer ${jwt}`,
      "content-type": "application/json",
      "user-agent": "bogas04-telegram-bot",
      "x-github-api-version": "2022-11-28",
    },
    body: JSON.stringify({ repositories: [env.GITHUB_REPO] }),
  });
  const result = await response.json();
  if (!response.ok || !result.token) throw new Error(`GitHub installation token failed (${response.status})`);
  return result.token;
}

async function githubRequest(token, path, options = {}) {
  const response = await fetch(`https://api.github.com/repos/${options.owner}/${options.repo}${path}`, {
    ...options.fetch,
    headers: {
      accept: "application/vnd.github+json",
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
      "user-agent": "bogas04-telegram-bot",
      "x-github-api-version": "2022-11-28",
      ...options.headers,
    },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(`GitHub request failed (${response.status}): ${payload.message || "unknown error"}`);
  return payload;
}

async function getFile(token, env, path, ref) {
  try {
    const result = await githubRequest(token, `/contents/${path}?ref=${encodeURIComponent(ref)}`, {
      owner: env.GITHUB_OWNER,
      repo: env.GITHUB_REPO,
    });
    return new TextDecoder().decode(Uint8Array.from(atob(result.content.replace(/\n/g, "")), (char) => char.charCodeAt(0)));
  } catch (error) {
    if (String(error.message).includes("(404)")) return null;
    throw error;
  }
}

async function createBlob(token, env, content, encoding = "utf-8") {
  return githubRequest(token, "/git/blobs", {
    owner: env.GITHUB_OWNER,
    repo: env.GITHUB_REPO,
    fetch: {
      method: "POST",
      body: JSON.stringify({ content, encoding }),
    },
  });
}

function safeTitle(text) {
  const firstLine = text.split(/\r?\n/).map((line) => line.trim()).find(Boolean) || "A moment";
  return firstLine.replace(/^#+\s*/, "").slice(0, 100);
}

function safeSlug(text) {
  return text.normalize("NFKD").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 48) || "moment";
}

function quoteYaml(value) {
  return JSON.stringify(value);
}

function markdownImageAlt(value) {
  return value.replace(/\\/g, "\\\\").replace(/\[/g, "\\[").replace(/\]/g, "\\]");
}

function dateStamp(date) {
  return date.toISOString().slice(0, 10);
}

function blogMarkdown(title, body, createdAt, image) {
  const description = body.replace(/\s+/g, " ").slice(0, 180);
  const content = image
    ? `${body.trim()}\n\n[![${markdownImageAlt(image.alt)}](/img/now/${image.id}.jpg)](/images/now/${image.id}/)`
    : body.trim();
  return `---\ntitle: ${quoteYaml(title)}\ndescription: ${quoteYaml(description)}\ndate: ${quoteYaml(createdAt.toISOString())}\ncategories: []\nkeywords: [now]\n---\n\n${content}\n`;
}

function imageSidecar(title, alt, date, caption) {
  return `---\ntitle: ${quoteYaml(title)}\nalt: ${quoteYaml(alt)}\ntakenAt: ${quoteYaml(dateStamp(date))}\nlocation:\npublished: true\nfeatured: false\noptimized: true\noptimizationVersion: "3"\n---\n\n${caption.trim()}\n`;
}

function freshAlbum(id, date) {
  const day = dateStamp(date);
  return `---\ntitle: now\nsummary: Small moments, shared as they happen.\ncover: ${id}\ncategory: random\nstartDate: ${day}\nendDate: ${day}\npublished: true\n---\n\nA scrapbook of moments shared through Telegram.\n`;
}

function updateAlbumDates(markdown, id, date) {
  const day = dateStamp(date);
  const result = markdown
    .replace(/^cover:.*$/m, (line) => line)
    .replace(/^endDate:.*$/m, (line) => `endDate: ${day}`);
  if (!/^cover:/m.test(result)) return freshAlbum(id, date);
  return result;
}

function insertNowAlbum(registry) {
  const data = JSON.parse(registry);
  data.albums ||= [];
  if (!data.albums.some((album) => album.id === "now")) {
    data.albums.push({ id: "now", path: "public/img/now" });
    data.albums.sort((a, b) => a.id.localeCompare(b.id));
  }
  return `${JSON.stringify(data, null, 2)}\n`;
}

function base64Bytes(bytes) {
  let binary = "";
  const chunkSize = 0x8000;
  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
  }
  return btoa(binary);
}

async function telegramCall(env, method, payload) {
  const response = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/${method}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
  const result = await response.json();
  if (!response.ok || !result.ok) throw new Error(`Telegram ${method} failed`);
  return result.result;
}

async function registerTelegramWebhook(env) {
  await telegramCall(env, "setWebhook", {
    url: "https://bot.bogas04.fyi/telegram/webhook",
    secret_token: env.TELEGRAM_WEBHOOK_SECRET,
    allowed_updates: ["message"],
  });
  const info = await telegramCall(env, "getWebhookInfo", {});
  return json({
    ok: true,
    url: info.url,
    pendingUpdates: info.pending_update_count || 0,
    lastError: info.last_error_message || null,
  });
}

function commandText(message) {
  const raw = message.text || message.caption || "";
  const match = raw.match(/^\/now(?:@bogas04_bot)?(?:\s+|$)/i);
  return match ? raw.slice(match[0].length).trim() : null;
}

function largestPhoto(message) {
  if (!Array.isArray(message.photo) || !message.photo.length) return null;
  return message.photo.reduce((largest, current) => current.file_size > (largest.file_size || 0) ? current : largest);
}

async function sanitizedPhoto(env, fileId) {
  const details = await telegramCall(env, "getFile", { file_id: fileId });
  if (!details.file_path || details.file_size > MAX_TELEGRAM_FILE_BYTES) {
    throw new Error("That photo is too large for this bot to download (20 MB maximum).");
  }
  const response = await fetch(`https://api.telegram.org/file/bot${env.TELEGRAM_BOT_TOKEN}/${details.file_path}`);
  if (!response.ok) throw new Error("Telegram could not provide that photo.");
  const input = new Uint8Array(await response.arrayBuffer());
  if (!input.length || input.length > MAX_TELEGRAM_FILE_BYTES) throw new Error("That photo is too large or empty.");

  const optimized = await env.IMAGES.input(input)
    .transform({ width: MAX_IMAGE_EDGE, height: MAX_IMAGE_EDGE, fit: "scale-down", metadata: "none" })
    .output({ format: "image/jpeg", quality: 95 });
  const result = optimized.response();
  if (result.headers.get("content-type") !== "image/jpeg") {
    throw new Error("Cloudflare did not return the expected sanitized JPEG.");
  }
  return new Uint8Array(await result.arrayBuffer());
}

async function commitFiles(env, files, commitMessage) {
  const token = await githubToken(env);
  const owner = env.GITHUB_OWNER;
  const repo = env.GITHUB_REPO;
  const branch = env.GITHUB_BRANCH;

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const ref = await githubRequest(token, `/git/ref/heads/${encodeURIComponent(branch)}`, { owner, repo });
    const parentSha = ref.object.sha;
    const parent = await githubRequest(token, `/git/commits/${parentSha}`, { owner, repo });
    const tree = [];
    for (const file of files) {
      const blob = await createBlob(token, env, file.content, file.encoding || "utf-8");
      tree.push({ path: file.path, mode: "100644", type: "blob", sha: blob.sha });
    }
    const nextTree = await githubRequest(token, "/git/trees", {
      owner,
      repo,
      fetch: { method: "POST", body: JSON.stringify({ base_tree: parent.tree.sha, tree }) },
    });
    const commit = await githubRequest(token, "/git/commits", {
      owner,
      repo,
      fetch: {
        method: "POST",
        body: JSON.stringify({ message: commitMessage, tree: nextTree.sha, parents: [parentSha] }),
      },
    });
    try {
      await githubRequest(token, `/git/refs/heads/${encodeURIComponent(branch)}`, {
        owner,
        repo,
        fetch: { method: "PATCH", body: JSON.stringify({ sha: commit.sha, force: false }) },
      });
      return commit.html_url;
    } catch (error) {
      if (!String(error.message).includes("(422)") || attempt === 2) throw error;
    }
  }
  throw new Error("Could not update the repository after several concurrent changes.");
}

async function publish(env, message, text, altText, updateId) {
  const telegramDate = new Date((message.date || Math.floor(Date.now() / 1000)) * 1000);
  const title = safeTitle(text);
  const id = `${dateStamp(telegramDate).replace(/-/g, "")}-${String(message.message_id).padStart(6, "0")}-${safeSlug(title).slice(0, 24)}`;
  const files = [{
    path: `src/blog/now ${id}.md`,
    content: "",
  }];
  let photoId = null;
  const photo = largestPhoto(message);
  if (photo) {
    if (!altText) throw new Error("Please reply with a short description of what is visible in the photo.");
    photoId = id;
    const image = await sanitizedPhoto(env, photo.file_id);
    files[0].content = blogMarkdown(title, text, telegramDate, { id: photoId, alt: altText });
    files.push(
      { path: `public/img/now/${photoId}.jpg`, content: base64Bytes(image), encoding: "base64" },
      { path: `public/img/now/${photoId}.md`, content: imageSidecar(title, altText, telegramDate, text) },
    );
    const token = await githubToken(env);
    const branch = env.GITHUB_BRANCH;
    const currentIndex = await getFile(token, env, "public/img/now/index.md", branch);
    const currentRegistry = await getFile(token, env, "gallery/albums.json", branch);
    if (!currentRegistry) throw new Error("Could not find gallery/albums.json.");
    files.push({
      path: "gallery/albums.json",
      content: insertNowAlbum(currentRegistry),
    });
    files.push({
      path: "public/img/now/index.md",
      content: currentIndex ? updateAlbumDates(currentIndex, photoId, telegramDate) : freshAlbum(photoId, telegramDate),
    });
  } else {
    files[0].content = blogMarkdown(title, text, telegramDate, null);
  }
  const commitUrl = await commitFiles(env, files, `now: ${title.slice(0, 60)}`);
  await env.BOT_STATE.put(`done:${updateId}`, "1", { expirationTtl: 60 * 60 * 24 * 30 });
  await telegramCall(env, "sendMessage", {
    chat_id: message.chat.id,
    text: `Published to /now${photoId ? " and /images/now" : ""}. The site will update after the build finishes.\n${commitUrl}`,
    disable_web_page_preview: true,
  });
}

async function processUpdate(env, update) {
  const message = update.message;
  if (!message || !message.chat || !message.from) return;
  if (String(message.chat.id) !== String(env.TELEGRAM_CHAT_ID) || String(message.from.id) !== String(env.TELEGRAM_USER_ID) || message.chat.type !== "private") return;
  const updateKey = `done:${update.update_id}`;
  if (await env.BOT_STATE.get(updateKey)) return;

  if (message.text === "/start" || message.text === "/start@bogas04_bot") {
    await telegramCall(env, "sendMessage", {
      chat_id: message.chat.id,
      text: "Send /now followed by the update text. Attach one photo if you want it in the now album.",
    });
    return;
  }

  const text = commandText(message);
  if (text !== null) {
    if (!text) {
      await telegramCall(env, "sendMessage", { chat_id: message.chat.id, text: "Send /now followed by the update text. Attach one photo if you want it in the now album." });
      return;
    }
    const photo = largestPhoto(message);
    if (!photo) {
      await publish(env, message, text, "", update.update_id);
      return;
    }
    await env.BOT_STATE.put(`pending:${message.chat.id}`, JSON.stringify({ message, text, updateId: update.update_id }), { expirationTtl: 60 * 60 });
    await telegramCall(env, "sendMessage", { chat_id: message.chat.id, text: "Reply with a short alt description of what is visible in the photo. The post will publish after that." });
    return;
  }

  const pendingRaw = await env.BOT_STATE.get(`pending:${message.chat.id}`);
  if (!pendingRaw) return;
  const altText = (message.text || "").trim();
  if (!altText || altText.length > 500) {
    await telegramCall(env, "sendMessage", { chat_id: message.chat.id, text: "Please reply with a plain text image description, up to 500 characters." });
    return;
  }
  const pending = JSON.parse(pendingRaw);
  await publish(env, pending.message, pending.text, altText, pending.updateId);
  await env.BOT_STATE.delete(`pending:${message.chat.id}`);
}

async function handleUpdate(env, update) {
  try {
    await processUpdate(env, update);
  } catch (error) {
    console.error("Telegram update failed", error instanceof Error ? error.message : "unknown error");
    const message = update.message;
    if (message?.chat?.id) {
      await telegramCall(env, "sendMessage", {
        chat_id: message.chat.id,
        text: error instanceof Error ? `I couldn't publish that update: ${error.message}` : "I couldn't publish that update. Please try again.",
      }).catch(() => {});
    }
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (request.method === "GET" && url.pathname === "/") return new Response("bogas04 telegram bot is ready");
    if (url.pathname === "/telegram/admin/register") {
      if (request.method !== "POST") return new Response("Method not allowed", { status: 405 });
      if (!env.TELEGRAM_WEBHOOK_SECRET || request.headers.get("authorization") !== `Bearer ${env.TELEGRAM_WEBHOOK_SECRET}`) {
        return new Response("Unauthorized", { status: 401 });
      }
      try {
        return await registerTelegramWebhook(env);
      } catch (error) {
        console.error("Telegram webhook registration failed", error instanceof Error ? error.message : "unknown error");
        return json({ ok: false, error: error instanceof Error ? error.message : "Registration failed" }, 502);
      }
    }
    if (url.pathname !== WEBHOOK_PATH) return new Response("Not found", { status: 404 });
    if (request.method !== "POST") return new Response("Method not allowed", { status: 405 });
    if (request.headers.get("x-telegram-bot-api-secret-token") !== env.TELEGRAM_WEBHOOK_SECRET) {
      return new Response("Unauthorized", { status: 401 });
    }
    let update;
    try {
      update = await request.json();
    } catch {
      return new Response("Bad request", { status: 400 });
    }
    ctx.waitUntil(handleUpdate(env, update));
    return json({ ok: true });
  },
};
