import { expect, test } from "@playwright/test";

test("write is a local-only blog authoring surface", async ({ page }) => {
  await page.goto("/write");

  await expect(page).toHaveTitle(/write \| divjot/i);
  await expect(page.getByRole("heading", { name: "write something." })).toBeVisible();
  await expect(page.getByRole("button", { name: "Connect repository" })).toBeVisible();
  await expect(page.getByRole("button", { name: "New post" })).toBeDisabled();
  await expect(page.getByText("Connect the repository to edit posts.")).toBeVisible();
});
