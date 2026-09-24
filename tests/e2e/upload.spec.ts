import fs from "node:fs";
import path from "node:path";
import { expect, test } from "@playwright/test";

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
  expect(response.headers()["x-image-optimization-version"]).toBe("2");
  expect((await response.body()).length).toBeGreaterThan(0);
});
