const json = (value, status = 200) =>
  new Response(JSON.stringify(value), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });

async function telegram(env, method, payload) {
  const response = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/${method}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
  const result = await response.json();
  if (!response.ok || !result.ok) throw new Error(`Telegram ${method} failed`);
  return result.result;
}

async function reply(env, chatId, text) {
  await telegram(env, "sendMessage", { chat_id: chatId, text });
}

function getMedia(message) {
  if (Array.isArray(message.photo) && message.photo.length) {
    const photo = message.photo[message.photo.length - 1];
    return { fileId: photo.file_id, kind: "image", mime: "image/jpeg", size: photo.file_size };
  }
  if (message.video) {
    const video = message.video;
    if (video.mime_type !== "video/mp4") throw new Error("Please send videos as MP4 files.");
    return { fileId: video.file_id, kind: "video", mime: "video/mp4", size: video.file_size };
  }
  if (message.document) {
    const document = message.document;
    const imageTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
    if (!imageTypes.has(document.mime_type)) throw new Error("For an uncompressed image, send a JPEG, PNG, or WebP file.");
    return { fileId: document.file_id, kind: "image", mime: document.mime_type, size: document.file_size };
  }
  throw new Error("Send a photo, JPEG/PNG/WebP image file, or MP4 video with a caption.");
}

export default {
  async fetch(request, env) {
    if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
    if (request.headers.get("X-Telegram-Bot-Api-Secret-Token") !== env.TELEGRAM_WEBHOOK_SECRET) {
      return json({ error: "Unauthorized" }, 401);
    }

    let update;
    try {
      update = await request.json();
    } catch {
      return json({ error: "Invalid JSON" }, 400);
    }

    const message = update.message;
    if (!message?.chat?.id) return json({ ok: true });
    const chatId = message.chat.id;
    if (message.chat.type !== "private" || String(message.from?.id) !== env.ALLOWED_TELEGRAM_USER_ID) {
      return json({ ok: true });
    }
    if (message.text === "/start") {
      await reply(env, chatId, "Send me a photo, JPEG/PNG/WebP image file, or MP4 video with a caption to add it to your /now scrapbook.");
      return json({ ok: true });
    }

    const caption = (message.caption || "").trim();
    if (!caption) {
      await reply(env, chatId, "Please add a caption to the photo or video.");
      return json({ ok: true });
    }

    const key = `telegram-now/${update.update_id}`;
    try {
      const media = getMedia(message);
      if (media.size && media.size > 20 * 1024 * 1024) throw new Error("Telegram bot downloads are limited to 20 MB. Please send a smaller file.");
      if (await env.PENDING_MEDIA.head(key)) return json({ ok: true });

      const file = await telegram(env, "getFile", { file_id: media.fileId });
      if (file.file_size && file.file_size > 20 * 1024 * 1024) throw new Error("Telegram bot downloads are limited to 20 MB. Please send a smaller file.");
      const download = await fetch(`https://api.telegram.org/file/bot${env.TELEGRAM_BOT_TOKEN}/${file.file_path}`);
      if (!download.ok) throw new Error("Could not download the Telegram media.");
      const downloadedSize = Number(download.headers.get("content-length") || 0);
      if (downloadedSize > 20 * 1024 * 1024) throw new Error("Telegram bot downloads are limited to 20 MB. Please send a smaller file.");
      if (!download.body) throw new Error("Telegram returned an empty media file.");
      await env.PENDING_MEDIA.put(key, download.body, {
        httpMetadata: { contentType: media.mime },
        customMetadata: { kind: media.kind },
      });

      const dispatch = await fetch(`https://api.github.com/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/actions/workflows/${env.GITHUB_WORKFLOW}/dispatches`, {
        method: "POST",
        headers: {
          accept: "application/vnd.github+json",
          authorization: `Bearer ${env.GITHUB_ACTIONS_TOKEN}`,
          "x-github-api-version": "2022-11-28",
          "content-type": "application/json",
          "user-agent": "bogas-now-telegram",
        },
        body: JSON.stringify({
          ref: "main",
          inputs: {
            telegram_now_object: key,
            telegram_now_caption: caption,
            telegram_now_kind: media.kind,
            telegram_now_update_id: String(update.update_id),
          },
        }),
      });
      if (!dispatch.ok) {
        await env.PENDING_MEDIA.delete(key);
        throw new Error("Could not start the website publishing workflow.");
      }
      await reply(env, chatId, "Received. I’ll sanitize the media and publish your /now update after the site build.");
    } catch (error) {
      await reply(env, chatId, error instanceof Error ? error.message : "Could not publish this update.");
    }
    return json({ ok: true });
  },
};
