import { expect, test } from "@playwright/test";

const isDesktop = (projectName: string) => projectName === "desktop";
const isMobile = (projectName: string) => projectName === "mobile";

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
  await expect(page.getByRole("link", { name: "/blog", exact: true })).toHaveAttribute(
    "href",
    "/blog/",
  );
});

test("now navigation returns from friends to scrapbook updates without scrolling", async ({ page }) => {
  await page.goto("/now#friends");
  await expect(page.getByRole("heading", { name: /my friends \(\d+\)/ }).first()).toBeVisible();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);

  await page.getByRole("link", { name: "Scrapbook", exact: true }).click();

  await expect(page).toHaveURL(/\/now\/?$/);
  await expect(page.getByRole("tab", { name: "my updates", exact: true })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(page.getByText("Updates from: me", { exact: true })).toBeVisible();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
});

test("all pictures uses year-only date sections", async ({ page }) => {
  await page.goto("/images");

  const dateLabels = await page
    .locator('section[aria-labelledby^="date-"] h2')
    .allTextContents();

  expect(dateLabels.length).toBeGreaterThan(0);
  expect(dateLabels.every((label) => /^(?:\d{4}|undated)$/.test(label.trim()))).toBe(true);
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
