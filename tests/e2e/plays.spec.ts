import { expect, test } from "@playwright/test";

test("home links to the games dashboard and its destinations", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const images = page.getByRole("link", { name: /images places, people & moments/i });
  const plays = page.getByRole("link", { name: /plays games & adventures/i });
  const imagesBox = await images.boundingBox();
  const playsBox = await plays.boundingBox();
  expect(imagesBox && playsBox).toBeTruthy();
  expect(Math.abs(imagesBox!.y - playsBox!.y)).toBeLessThan(1);
  expect(playsBox!.x).toBeGreaterThan(imagesBox!.x);
  await plays.click();
  await expect(page).toHaveURL(/\/plays\/?$/);
  await expect(page.getByRole("heading", { name: "My games" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My games", exact: true })).toHaveAttribute("href", "https://trello.com/b/Ctw7Er15/games");
  await expect(page.getByRole("link", { name: /My captures/ })).toHaveAttribute("href", "/images/screenshots/");
  await expect(page.getByRole("link", { name: "My reviews" })).toHaveAttribute("href", "/blog/tags/video-game-industry/");
  await expect(page.getByRole("link", { name: "My achievements" })).toHaveAttribute("href", "https://www.trueachievements.com/gamer/bogas04");
  await expect(page.getByText("bogas04", { exact: true })).toHaveCount(2);
  await expect(page.getByText("bogas_04", { exact: true })).toBeVisible();
  await expect(page.locator(".plays-splash")).toHaveCount(0);
});

test("dashboard tiles stay usable and do not shift surrounding content", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/plays/");
  const games = page.getByRole("link", { name: "My games", exact: true });
  const captures = page.getByRole("link", { name: /My captures/ });
  const ids = page.getByRole("heading", { name: "Find me in games" });
  const before = await ids.boundingBox();
  await captures.focus();
  await expect(captures).toBeFocused();
  const gameBox = await games.boundingBox();
  const captureBox = await captures.boundingBox();
  const after = await ids.boundingBox();
  expect(before && after && gameBox && captureBox).toBeTruthy();
  expect(Math.abs(after!.y - before!.y)).toBeLessThan(1);
  expect(Math.abs(captureBox!.width - captureBox!.height)).toBeLessThan(1);
  if (testInfo.project.name === "mobile") {
    expect(gameBox!.width).toBeGreaterThan(captureBox!.width * 2.9);
    expect(gameBox!.y + gameBox!.height).toBeLessThanOrEqual(captureBox!.y);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  } else {
    expect(captureBox!.width).toBeGreaterThan(gameBox!.width * 1.9);
    expect(Math.abs(gameBox!.y + gameBox!.height - captureBox!.y - captureBox!.height)).toBeLessThan(1);
  }
});

test("a standard gamepad moves between tiles and activates a link", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() => {
    const state = { buttons: Array.from({ length: 16 }, () => ({ pressed: false })), axes: [0, 0] };
    Object.assign(window, { __playsGamepad: state });
    Object.defineProperty(navigator, "getGamepads", {
      configurable: true,
      value: () => [{ connected: true, mapping: "standard", ...state }],
    });
  });
  await page.goto("/plays/");
  const games = page.getByRole("link", { name: "My games", exact: true });
  const captures = page.getByRole("link", { name: /My captures/ });
  await games.focus();
  const setButton = (index: number, pressed: boolean) => page.evaluate(({ index, pressed }) => {
    const state = (window as unknown as { __playsGamepad: { buttons: { pressed: boolean }[] } }).__playsGamepad;
    state.buttons[index].pressed = pressed;
  }, { index, pressed });
  await setButton(testInfo.project.name === "mobile" ? 13 : 15, true);
  if (testInfo.project.name === "mobile") {
    await expect(page.getByRole("link", { name: "My reviews" })).toBeFocused();
    await setButton(13, false);
    await page.waitForTimeout(50);
    await setButton(14, true);
  }
  await expect(captures).toBeFocused();
  await setButton(testInfo.project.name === "mobile" ? 14 : 15, false);
  await setButton(0, true);
  await expect(page).toHaveURL(/\/images\/screenshots\/?$/);
});

test("splash appears once per local day and does not replay on return", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/plays/");
  const splash = page.locator(".plays-splash");
  await expect(splash).toBeVisible();
  await expect(splash).toHaveCount(0);
  await page.getByRole("link", { name: "divjot, home" }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole("heading", { name: "divjot", level: 1 })).toBeVisible();
  await page.goBack();
  await expect(page.getByRole("heading", { name: "My games" })).toBeVisible();
  await expect(splash).toHaveCount(0);

  await page.evaluate(() => localStorage.setItem("plays-splash-date", "2000-1-1"));
  await page.reload();
  await expect(splash).toBeVisible();
  await expect(splash).toHaveCount(0);
});
