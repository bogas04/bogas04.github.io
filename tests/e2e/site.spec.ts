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
  await expect(page.getByRole("link", { name: /blog thoughts & stories/i })).toHaveAttribute(
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
  const photos = gallery.getByRole("link", { name: /View photo \d+ from/ });
  expect(await photos.count()).toBeGreaterThan(1);
  await expect(photos.first()).toHaveAttribute("href", /^\/images\//);

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

test("work timeline opens the selected role without closing when reading", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Show work from 2020" }).click();
  await expect(page.getByRole("button", { name: "Show work from 2020" })).toHaveAttribute("aria-pressed", "true");
  const carousel = page.getByRole("region", { name: "Work experience" });
  const udaan = carousel.locator("article").filter({ hasText: "udaan, Bengaluru" });
  await udaan.getByRole("button", { name: /Read highlights/ }).click();
  const details = page.locator("#work-experience-udaan");
  await expect(details).toBeVisible();
  await page.locator("#work article").getByText("Management", { exact: true }).click();
  await expect(details).toBeVisible();
  await page.getByRole("button", { name: "Close highlights" }).click();
  await expect(carousel).toBeVisible();
  await expect(page.getByRole("button", { name: "Show work from 2020" })).toHaveAttribute("aria-pressed", "true");
});

test("work highlights have shareable URLs and follow browser history", async ({ page }) => {
  await page.goto("/?source=test&work=swiggy#work");
  await expect(page.locator("#work-experience-swiggy-sde3")).toBeVisible();
  await page.reload();
  await expect(page.locator("#work-experience-swiggy-sde3")).toBeVisible();
  await page.getByRole("button", { name: "Close highlights" }).click();
  await expect(page.getByRole("region", { name: "Work experience" })).toBeVisible();
  await expect(page).toHaveURL(/source=test/);
  await expect(page).not.toHaveURL(/work=/);
  await page.goBack();
  await expect(page.locator("#work-experience-swiggy-sde3")).toBeVisible();
  await page.goForward();
  await expect(page.getByRole("region", { name: "Work experience" })).toBeVisible();
});

test("work duration stays readable and the website link does not stretch", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/?work=udaan#work");
  const card = page.locator("#work article").filter({ hasText: "udaan, Bengaluru" });
  const dates = card.getByText(/April 2020 - November 2026/);
  await expect(dates).toContainText("(6y 7m)");
  if (testInfo.project.name === "mobile") {
    const dateBox = await dates.boundingBox();
    const websiteBox = await card.getByRole("link", { name: /Visit udaan.*website/i }).boundingBox();
    expect(dateBox && websiteBox).toBeTruthy();
    expect(websiteBox!.height).toBeLessThan(dateBox!.height);
  }
});

test("stats redirects to the GoatCounter dashboard", async ({ page }) => {
  await page.route("https://bogas04.goatcounter.com/**", (route) => route.fulfill({ status: 200, body: "GoatCounter dashboard" }));
  await page.goto("/stats/");
  await expect(page).toHaveURL("https://bogas04.goatcounter.com/");
  await expect(page.getByText("GoatCounter dashboard")).toBeVisible();
});
