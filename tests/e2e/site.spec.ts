import { expect, test } from "@playwright/test";

const isDesktop = (projectName: string) => projectName === "desktop";
const isMobile = (projectName: string) => projectName === "mobile";
const buildGeneratedPaths = new Set(["/blog.xml", "/blog.atom"]);

test("homepage presents the essential profile content and navigation", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/divjot/i);
  await expect(
    page.getByRole("img", { name: "Portrait of divjot" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "divjot", level: 1 })).toBeVisible();
  await expect(page.getByText("such work", { exact: true })).toBeVisible();
  await expect(page.getByText("many travels", { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "blog", exact: true })).toHaveAttribute(
    "href",
    "/blog/",
  );
});

test("mobile travel galleries are horizontally scrollable carousels", async ({
  page,
}, testInfo) => {
  test.skip(!isMobile(testInfo.project.name), "This assertion covers the mobile-only gallery.");
  await page.goto("/#travel");

  const gallery = page.locator("#travel .image-gallery").first();
  await expect(gallery).toBeVisible();
  await expect(gallery.getByRole("button")).toHaveCount(11);

  const initialScrollLeft = await gallery.evaluate((element) => element.scrollLeft);
  await gallery.evaluate((element) => {
    element.scrollBy({ left: element.clientWidth, behavior: "instant" });
  });
  await expect
    .poll(() => gallery.evaluate((element) => element.scrollLeft))
    .toBeGreaterThan(initialScrollLeft);
});

test("desktop travel thumbnails open a photo card whose controls change photos", async ({
  page,
}, testInfo) => {
  test.skip(!isDesktop(testInfo.project.name), "This assertion covers the desktop-only travel cards.");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#travel");

  await page
    .locator("#travel .travel-map")
    .getByRole("button", { name: /^Thailand/ })
    .click();
  const previous = page.getByRole("button", {
    name: "Show previous photo of Thailand",
  });
  const next = page.getByRole("button", { name: "Show next photo of Thailand" });
  const activePhoto = page.getByRole("img", { name: "Thailand, photo 1" });

  await expect(activePhoto).toBeVisible();
  await next.click();
  await expect(page.getByRole("img", { name: "Thailand, photo 2" })).toBeVisible();
  await previous.click();
  await expect(page.getByRole("img", { name: "Thailand, photo 1" })).toBeVisible();
});

test("blog listing, tag archive, post, and in-post image render", async ({ page }) => {
  await page.goto("/blog");
  await expect(page.getByRole("heading", { name: "divjot's blog" })).toBeVisible();

  const firstTag = page.locator('[aria-label="Tags"] a').first();
  const tagUrl = await firstTag.getAttribute("href");
  expect(tagUrl).toMatch(/^\/blog\/tags\//);
  await page.goto(tagUrl!);
  await expect(page.getByText("Posts tagged", { exact: false })).toBeVisible();

  await page.goto("/blog/2020/11/effective-remote-communication");
  await expect(
    page.getByRole("heading", { name: "Effective Remote Communication" }),
  ).toBeVisible();
  const articleImage = page.locator(".blog-content img").first();
  await expect(articleImage).toBeVisible();
  await expect(articleImage).toHaveAttribute("src", /\/img\/blog\//);
  await expect(articleImage.locator("xpath=.."), "Blog images should link to their source file.").toHaveClass(/blog-image-link/);
});

function toLocalPath(value: string, pageUrl: string, baseURL: string): string | null {
  const url = new URL(value, pageUrl);
  if (url.origin !== baseURL) return null;
  if (url.protocol !== "http:" && url.protocol !== "https:") return null;
  return `${url.pathname}${url.search}`;
}

function collectLocalResources(html: string, pageUrl: string, baseURL: string) {
  const values = html.matchAll(/(?:href|src)=["']([^"']+)["']/gi);
  return Array.from(values, ([, value]) => toLocalPath(value, pageUrl, baseURL)).filter(
    (path): path is string => Boolean(path),
  );
}

test("every reachable local page, link, and image responds without a 404", async ({ request, baseURL }, testInfo) => {
  test.skip(!isDesktop(testInfo.project.name), "One crawl is enough; device-specific UI is covered separately.");
  const origin = new URL(baseURL!).origin;
  const pending = ["/", "/blog", "/blog/tags"];
  const checked = new Set<string>();
  const failures: string[] = [];

  while (pending.length > 0) {
    const currentPath = pending.shift()!;
    if (checked.has(currentPath)) continue;
    checked.add(currentPath);
    // These feeds are emitted into docs/ by `make build`, not served by Next dev.
    if (buildGeneratedPaths.has(currentPath)) continue;

    const response = await request.get(currentPath);
    if (response.status() >= 400) {
      failures.push(`${currentPath} returned ${response.status()}`);
      continue;
    }

    if (!response.headers()["content-type"]?.includes("text/html")) continue;
    for (const localPath of collectLocalResources(await response.text(), `${origin}${currentPath}`, origin)) {
      if (!checked.has(localPath)) pending.push(localPath);
    }
  }

  expect(failures, failures.join("\n")).toEqual([]);
});
