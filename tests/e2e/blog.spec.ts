import { expect, test } from "@playwright/test";

test("blog listing, tag archive, post, and in-post image render", async ({ page }) => {
  await page.goto("/blog");
  await expect(page.getByRole("heading", { name: "divjot's blog" })).toBeVisible();

  const firstTag = page.locator('[aria-label="Tags"] a').first();
  const tagUrl = await firstTag.getAttribute("href");
  expect(tagUrl).toMatch(/^\/blog\/tags\//);
  await page.goto(tagUrl!);
  await expect(page.getByText("Posts tagged", { exact: false })).toBeVisible();

  await page.goto("/blog/2020/11/effective-remote-communication");
  await expect(page.getByRole("heading", { name: "Effective Remote Communication" })).toBeVisible();
  const articleImage = page.locator(".blog-content img").first();
  await expect(articleImage).toBeVisible();
  await expect(articleImage).toHaveAttribute("src", /\/img\/blog\//);
  await expect(articleImage.locator("xpath=.."), "Blog images should link to their source file.").toHaveClass(/blog-image-link/);
});
