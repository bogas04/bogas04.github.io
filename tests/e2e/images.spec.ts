import { expect, test } from "@playwright/test";

const isDesktop = (projectName: string) => projectName === "desktop";
const isMobile = (projectName: string) => projectName === "mobile";

test("image gallery routes use canonical img files and human-friendly photo labels", async ({ page }, testInfo) => {
  await page.goto("/images/ireland/");
  if (isMobile(testInfo.project.name)) {
    await expect(page.locator("[data-gallery-frame]")).toHaveCSS("touch-action", "pan-x pan-y");
    expect(await page.evaluate(() => {
      const event = new Event("gesturestart", { cancelable: true });
      document.dispatchEvent(event);
      return event.defaultPrevented;
    })).toBe(true);
  }
  await expect(page.getByRole("heading", { name: "ireland" })).toBeVisible();
  const firstPhoto = page.locator('figure a[href^="/images/ireland/"]').first();
  await expect(firstPhoto).toBeVisible();
  await firstPhoto.click();
  await expect(page.getByRole("heading", { name: /this image/i })).toBeVisible();
  await expect(page.getByRole("link", { name: "Go back" })).toHaveAttribute("href", "/images/ireland/");
  await expect(page.getByRole("heading", { name: /this image/i }).getByRole("link", { name: "Ireland", exact: true })).toHaveAttribute("href", "/images/ireland/");
  await expect(page.locator("main img").first()).toHaveAttribute("src", /\/img\/travel\/ireland\//);
});

test("nested screenshot albums render at their canonical route", async ({ page }) => {
  await page.goto("/images/screenshots/a-plague-tale-innocence/");
  await expect(page.getByRole("heading", { name: /a plague tale innocence/i })).toBeVisible();
  await expect(page.locator('figure a[href^="/images/screenshots/a-plague-tale-innocence/"]').first()).toBeVisible();
});

test("image detail navigation fills each side of the photo and wraps within its album", async ({ page }) => {
  await page.goto("/images/ireland/ireland-1/");
  const navigation = page.getByRole("navigation", { name: "Image navigation" });
  const previous = navigation.getByRole("link", { name: /Show previous image:/ });
  const next = navigation.getByRole("link", { name: /Show next image:/ });
  const navigationBox = await navigation.boundingBox();
  const previousBox = await previous.boundingBox();
  const nextBox = await next.boundingBox();
  expect(navigationBox).not.toBeNull();
  expect(previousBox).not.toBeNull();
  expect(nextBox).not.toBeNull();
  expect(previousBox!.height).toBeGreaterThanOrEqual(navigationBox!.height - 1);
  expect(nextBox!.height).toBeGreaterThanOrEqual(navigationBox!.height - 1);
  expect(previousBox!.width + nextBox!.width).toBeGreaterThanOrEqual(navigationBox!.width - 1);
  await next.click({ position: { x: 4, y: nextBox!.height / 2 } });
  await expect(page).toHaveURL(/\/images\/ireland\/ireland-2\/?$/);
  const previousAfterNavigation = page.getByRole("navigation", { name: "Image navigation" }).getByRole("link", { name: /Show previous image:/ });
  const previousAfterNavigationBox = await previousAfterNavigation.boundingBox();
  expect(previousAfterNavigationBox).not.toBeNull();
  await previousAfterNavigation.click({ position: { x: previousAfterNavigationBox!.width - 4, y: previousAfterNavigationBox!.height / 2 } });
  await expect(page).toHaveURL(/\/images\/ireland\/ireland-1\/?$/);
});

test("gallery navigation works when View Transitions are unavailable", async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(document, "startViewTransition", { configurable: true, value: undefined }));
  await page.goto("/images/ireland/");
  await page.locator('figure a[href^="/images/ireland/"]').first().click();
  await expect(page).toHaveURL(/\/images\/ireland\/ireland-\d+\/?$/);
  await expect(page.getByRole("heading", { name: /this image/i })).toBeVisible();
});

test("gallery detail metadata and invalid routes remain correct", async ({ page }) => {
  await page.goto("/images/ireland/ireland-1/");
  await expect(page).toHaveTitle(/ireland/i);
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", "https://bogas04.fyi/images/ireland/ireland-1/");
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /https:\/\/bogas04\.fyi\/img\/travel\/ireland\//);
  const response = await page.goto("/images/not-an-album/not-an-image/");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: /page not found/i })).toBeVisible();
});

test("mobile gallery album navigation keeps history and provides a back link", async ({ page }, testInfo) => {
  test.skip(!isMobile(testInfo.project.name), "This assertion covers the mobile-only gallery.");
  await page.goto("/images/ireland/");
  await expect(page.getByRole("link", { name: "Go back" })).toHaveAttribute("href", "/images/");
  await page.goto("/images/?album=bali");
  const galleryNavigation = page.getByRole("navigation", { name: "Gallery views and albums" });
  await expect(galleryNavigation.getByRole("link", { name: "bali" })).toHaveAttribute("aria-current", "page");
  const galleryTrack = page.locator('[aria-label="Gallery views and albums"] + div');
  await expect.poll(() => galleryTrack.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
  await galleryTrack.locator(":scope > div").nth(2).locator('figure a[href^="/images/bali/"]').first().click();
  await expect(page).toHaveURL(/\/images\/bali\/bali-\d+\/?$/);
  await page.getByRole("link", { name: "Go back" }).click();
  await expect(page).toHaveURL("/images/?album=bali");
  await expect(galleryNavigation.getByRole("link", { name: "bali" })).toHaveAttribute("aria-current", "page");
});

test("desktop image-gallery date picker opens beside the selected date and navigates to another date", async ({ page }, testInfo) => {
  test.skip(!isDesktop(testInfo.project.name), "This assertion covers the desktop date picker.");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/images/");
  const dateTrigger = page.locator('section[aria-labelledby^="date-"] h2 button').nth(1);
  await dateTrigger.scrollIntoViewIfNeeded();
  const triggerBox = await dateTrigger.boundingBox();
  expect(triggerBox).not.toBeNull();
  await dateTrigger.click();
  const picker = page.getByRole("dialog", { name: "Choose a year" });
  await expect(picker).toBeVisible();
  const pickerBox = await picker.boundingBox();
  expect(pickerBox).not.toBeNull();
  expect(Math.abs(pickerBox!.y - triggerBox!.y)).toBeLessThan(160);
  const destination = picker.locator("button").nth(1);
  const destinationLabel = (await destination.textContent())?.trim();
  expect(destinationLabel).toBeTruthy();
  await destination.click();
  await expect(picker).toBeHidden();
  const destinationHeading = page.getByRole("heading", { name: destinationLabel!, exact: true });
  await expect.poll(() => destinationHeading.evaluate((element) => element.getBoundingClientRect().top)).toBeLessThan(200);
});


test("gallery back follows browsing history and falls back through the directory", async ({ page }) => {
  await page.goto("/images/screenshots/");
  await page.getByRole("link", { name: /cyberpunk 2077/i }).first().click();
  await expect(page).toHaveURL(/\/images\/screenshots\/cyberpunk-2077\/?$/);
  await page.getByRole("link", { name: "Go back" }).click();
  await expect(page).toHaveURL(/\/images\/screenshots\/?$/);

  // A direct entry has no known in-site predecessor. Each fallback replaces
  // the current entry, so the next back action continues up the hierarchy.
  const direct = await page.context().newPage();
  await direct.goto("/images/screenshots/cyberpunk-2077/02/");
  await direct.getByRole("link", { name: "Go back" }).click();
  await expect(direct).toHaveURL(/\/images\/screenshots\/cyberpunk-2077\/?$/);
  await direct.getByRole("link", { name: "Go back" }).click();
  await expect(direct).toHaveURL(/\/images\/screenshots\/?$/);
  await direct.getByRole("link", { name: "Go back" }).click();
  await expect(direct).toHaveURL(/\/images\/?$/);
});

test("gallery back restores the screenshots folder scroll position", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/images/screenshots/");
  const album = page.getByRole("link", { name: /the witcher 3/i }).first();
  await album.scrollIntoViewIfNeeded();
  const before = await page.evaluate(() => window.scrollY);
  expect(before).toBeGreaterThan(500);
  await album.click();
  await expect(page).toHaveURL(/\/the-witcher-3/);
  await page.getByRole("link", { name: "Go back" }).click();
  await expect(page).toHaveURL(/\/images\/screenshots\/?$/);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(before - 10);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(before + 10);
  await page.goForward();
  await expect(page).toHaveURL(/\/the-witcher-3/);
  await page.goBack();
  await expect(page).toHaveURL(/\/images\/screenshots\/?$/);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(before - 10);
});

test("opening a photo snapshots only the selected grid image", async ({ page }) => {
  await page.goto("/images/");
  const firstPhoto = page.locator('figure a[data-gallery-image-transition]:visible').first();
  await expect(firstPhoto).toBeVisible();
  const before = await page.locator('figure img').evaluateAll((images) => images.filter((image) => getComputedStyle(image).viewTransitionName !== "none").length);
  expect(before).toBe(0);
  await page.evaluate(() => {
    const original = document.startViewTransition.bind(document);
    document.startViewTransition = ((update: ViewTransitionUpdateCallback) => {
      const names = Array.from(document.querySelectorAll("figure img"))
        .map((image) => getComputedStyle(image).viewTransitionName)
        .filter((name) => name !== "none");
      (window as unknown as { capturedGalleryNames: string[] }).capturedGalleryNames = names;
      return original(update);
    }) as typeof document.startViewTransition;
  });
  await firstPhoto.click();
  await expect(page.getByRole("heading", { name: /this image/i })).toBeVisible();
  const names = await page.evaluate(() => (window as unknown as { capturedGalleryNames: string[] }).capturedGalleryNames);
  expect(names).toHaveLength(1);
  expect(names[0]).toMatch(/^gallery-/);
});
