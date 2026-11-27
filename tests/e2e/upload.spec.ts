import fs from "node:fs";
import path from "node:path";
import { expect, test } from "@playwright/test";
import { OPTIMIZATION_VERSION } from "../../src/utils/image-optimization";

test("upload is a local-only multi-image gallery authoring surface", async ({ page }) => {
  await page.goto("/upload");

  await expect(page).toHaveTitle(/upload \| divjot/i);
  await expect(page.getByRole("heading", { name: "organise your gallery." })).toBeVisible();
  await expect(page.getByRole("button", { name: "Connect repository" })).toBeVisible();
  await expect(page.getByText("Connect the repository to organise the gallery.")).toBeVisible();
});

test("local image optimizer returns a metadata-free JPEG within the 1440px limit", async ({ request }) => {
  const source = fs.readFileSync(path.join(process.cwd(), "public/img/travel/ireland/ireland-8.jpg"));
  const response = await request.post("/api/local-image-optimizer", { data: source });

  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("image/jpeg");
  expect(Number(response.headers()["x-image-width"])).toBeLessThanOrEqual(1440);
  expect(Number(response.headers()["x-image-height"])).toBeLessThanOrEqual(1440);
  expect(response.headers()["x-image-optimization-version"]).toBe(OPTIMIZATION_VERSION);
  expect((await response.body()).length).toBeGreaterThan(0);
});


test("local gallery controls link to the right album and image", async ({ page }) => {
  await page.goto("/images/ireland/");
  const controls = page.getByLabel("Local album controls");
  await expect(controls.getByRole("link", { name: "Edit album" })).toHaveAttribute("href", /album=ireland/);
  await expect(controls.getByRole("link", { name: "Add images" })).toHaveAttribute("href", /album=ireland.*action=add/);
  const editImage = page.locator("figure").first().getByRole("link", { name: /^Edit / });
  await expect(editImage).toHaveAttribute("href", /album=ireland.*image=ireland-/);
  await editImage.click();
  await expect(page).toHaveURL(/\/upload\/?\?album=ireland&image=ireland-/);
  await expect(page.getByRole("button", { name: "Connect repository" })).toBeVisible();

  await page.goto("/images/ireland/ireland-1/");
  await expect(page.getByRole("link", { name: "Edit image", exact: true })).toHaveAttribute("href", /album=ireland.*image=ireland-1/);
});

test("album shortcuts select their target after connecting a repository", async ({ page }) => {
  await page.addInitScript(() => {
    const originalPut = IDBObjectStore.prototype.put;
    IDBObjectStore.prototype.put = function (value, key) {
      return originalPut.call(this, value && typeof value.getDirectoryHandle === "function" ? null : value, key);
    };
    const file = (name: string, text: string) => ({ kind: "file", getFile: async () => new File([text], name) });
    const albums: Record<string, { getFileHandle: (name: string) => Promise<ReturnType<typeof file>>; entries: () => AsyncGenerator<[string, ReturnType<typeof file>]> }> = {};
    for (const name of ["first", "second"]) {
      const files: Record<string, ReturnType<typeof file>> = {
        "index.md": file("index.md", `---\ntitle: ${name}\npublished: true\n---\n`),
        "01.md": file("01.md", `---\ntitle: ${name} photo\nalt: photo of ${name}\npublished: true\n---\n`),
        "01.jpg": file("01.jpg", "image"),
      };
      albums[name] = {
        getFileHandle: async (filename) => { if (!files[filename]) throw new DOMException("Missing", "NotFoundError"); return files[filename]; },
        async *entries() { yield ["01.jpg", files["01.jpg"]]; },
      };
    }
    const registry = JSON.stringify({ albums: ["first", "second"].map((id) => ({ id, path: `public/img/${id}` })) });
    const repository = {
      getDirectoryHandle: async (name: string) => name === "gallery"
        ? { getFileHandle: async () => file("albums.json", registry) }
        : { getDirectoryHandle: async () => ({ getDirectoryHandle: async (id: string) => albums[id] }) },
    };
    Object.defineProperty(window, "showDirectoryPicker", { value: async () => repository });
  });
  await page.goto("/upload/?album=second&image=01");
  await page.getByRole("button", { name: "Connect repository" }).click();
  await expect(page.getByLabel("Album ID")).toHaveValue("second");
  await expect(page.getByLabel("Alt text")).toHaveValue("photo of second");
  await expect(page.getByRole("region", { name: "Image editor" })).toBeFocused();
  const sidebar = page.getByRole("complementary", { name: "Albums" });
  await expect(sidebar.getByRole("button", { name: /second.*1 image.*published/i })).toHaveAttribute("aria-current", "true");
  await page.keyboard.press(process.platform === "darwin" ? "Meta+k" : "Control+k");
  await expect(sidebar.getByRole("searchbox", { name: "Search albums" })).toBeFocused();
  await sidebar.getByRole("searchbox", { name: "Search albums" }).fill("first");
  await expect(sidebar.getByRole("button", { name: /first.*1 image/i })).toBeVisible();
  await expect(sidebar.getByRole("button", { name: /second.*1 image/i })).toHaveCount(0);
  await sidebar.getByRole("searchbox", { name: "Search albums" }).clear();
  await page.getByLabel("Alt text").fill("unsaved");
  page.once("dialog", (dialog) => dialog.dismiss());
  await sidebar.getByRole("button", { name: /new album/i }).click();
  await expect(page.getByLabel("Album ID")).toHaveValue("second");
  await page.getByLabel("Alt text").fill("photo of second");

  await page.goto("/upload/?album=second&action=add");
  await page.getByRole("button", { name: "Connect repository" }).click();
  await expect(page.getByLabel("Album ID")).toHaveValue("second");
  await expect(page.getByLabel("Upload images")).toBeFocused();
});

test("deleting an image protects unsaved details and album covers", async ({ page }) => {
  await page.addInitScript(() => {
    const originalPut = IDBObjectStore.prototype.put;
    IDBObjectStore.prototype.put = function (value, key) {
      return originalPut.call(this, value && typeof value.getDirectoryHandle === "function" ? null : value, key);
    };
    const file = (name: string, contents: string) => ({ kind: "file", getFile: async () => new File([contents], name) });
    const files: Record<string, ReturnType<typeof file>> = {
      "index.md": file("index.md", "---\ntitle: test album\ncover: 01\npublished: true\n---\n"),
      "01.jpg": file("01.jpg", "cover"),
      "01.md": file("01.md", "---\ntitle: cover\n---\n"),
      "02.jpg": file("02.jpg", "photo"),
      "02.md": file("02.md", "---\ntitle: second photo\n---\n"),
    };
    const album = {
      getFileHandle: async (name: string) => { if (!files[name]) throw new DOMException("Missing", "NotFoundError"); return files[name]; },
      async *entries() { for (const name of Object.keys(files)) yield [name, files[name]] as [string, ReturnType<typeof file>]; },
      removeEntry: async (name: string) => { if (!files[name]) throw new DOMException("Missing", "NotFoundError"); delete files[name]; },
    };
    const registry = JSON.stringify({ albums: [{ id: "test", path: "public/img/test" }] });
    const repository = { getDirectoryHandle: async (name: string) => name === "gallery"
      ? { getFileHandle: async () => file("albums.json", registry) }
      : { getDirectoryHandle: async () => ({ getDirectoryHandle: async () => album }) } };
    Object.defineProperty(window, "showDirectoryPicker", { value: async () => repository });
    Object.assign(window, { galleryTestFiles: () => Object.keys(files) });
  });
  await page.goto("/upload/?album=test&image=01");
  await page.getByRole("button", { name: "Connect repository" }).click();
  await page.getByRole("button", { name: "Delete image" }).click();
  await expect(page.getByRole("status")).toContainText("album cover");
  await page.getByRole("button", { name: "Edit second photo" }).click();
  await page.getByLabel("Alt text").fill("unsaved details");
  await page.getByRole("button", { name: "Delete image" }).click();
  await expect(page.getByRole("status")).toContainText("Save your unsaved");
  await page.getByLabel("Alt text").fill("");
  page.once("dialog", (dialog) => dialog.dismiss());
  await page.getByRole("button", { name: "Delete image" }).click();
  expect(await page.evaluate(() => (window as unknown as { galleryTestFiles: () => string[] }).galleryTestFiles())).toContain("02.jpg");
  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: "Delete image" }).click();
  await expect(page.getByRole("status")).toContainText("Deleted 02.jpg");
  const remaining = await page.evaluate(() => (window as unknown as { galleryTestFiles: () => string[] }).galleryTestFiles());
  expect(remaining).not.toContain("02.jpg");
  expect(remaining).not.toContain("02.md");
  expect(remaining).toContain("01.jpg");
  await expect(page.getByRole("button", { name: "Edit second photo" })).toHaveCount(0);
});
