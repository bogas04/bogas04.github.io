import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const home = readFileSync(resolve(process.cwd(), "src/data/home.json"), "utf8");

test("local admin edits structured home data without overwriting external changes", async ({ page }) => {
  await page.addInitScript((source) => {
    let text = source;
    Object.defineProperty(window, "showDirectoryPicker", { value: async () => ({
      getDirectoryHandle: async () => ({ getDirectoryHandle: async () => ({ getFileHandle: async () => ({
        getFile: async () => ({ text: async () => text }),
        createWritable: async () => ({ write: async (value: string) => { text = value; }, close: async () => {} }),
      }) }) }),
    }) });
    Object.assign(window, { adminDisk: () => text, changeAdminDisk: () => { text = text.replace("Sri Lanka", "Changed elsewhere"); } });
  }, home);
  await page.goto("/admin/");
  await expect(page.getByRole("link", { name: /Write \/now entry/ })).toHaveAttribute("href", "/now/");
  await page.getByRole("button", { name: "Connect repository" }).click();
  await expect(page.getByLabel("Company", { exact: true })).toHaveValue("udaan, Bengaluru");
  await page.getByLabel("Company", { exact: true }).fill("udaan, India");
  await page.getByRole("button", { name: "Save home page" }).click();
  await expect(page.getByRole("status")).toContainText("Saved src/data/home.json");
  expect(await page.evaluate(() => (window as unknown as { adminDisk: () => string }).adminDisk())).toContain("udaan, India");
  await page.getByRole("button", { name: "Education", exact: true }).click();
  await expect(page.getByLabel("Name", { exact: true })).toHaveValue("NSIT");
  await page.getByLabel("Subtitle", { exact: true }).fill("Netaji Subhas Institute of Technology\nComputer Engineering");
  await page.getByRole("button", { name: "Save home page" }).click();
  await expect(page.getByRole("status")).toContainText("Saved src/data/home.json");
  const saved = JSON.parse(await page.evaluate(() => (window as unknown as { adminDisk: () => string }).adminDisk()));
  expect(saved.education[0].subtitle).toContain("Computer Engineering");
  expect(saved.education[0].story[1]).toContain("NSITUlator");
  await page.getByRole("button", { name: "Intro & headings", exact: true }).click();
  await expect(page.getByLabel("Intro", { exact: true })).toHaveValue(/Heylo!/);
  await page.getByRole("button", { name: "Travel", exact: true }).click();
  await expect(page.getByLabel("Name", { exact: true })).toHaveValue("Sri Lanka");
  await page.getByLabel("Name", { exact: true }).fill("Sri Lanka trip");
  await page.evaluate(() => (window as unknown as { changeAdminDisk: () => void }).changeAdminDisk());
  await page.getByRole("button", { name: "Save home page" }).click();
  await expect(page.getByRole("status")).toContainText("The file changed on disk");
  expect(await page.evaluate(() => (window as unknown as { adminDisk: () => string }).adminDisk())).toContain("Changed elsewhere");
});

test("home education content retains its facts, stories and links", async ({ page }) => {
  await page.goto("/");
  const education = page.locator("#education");
  await expect(education.getByRole("heading", { name: /NSIT/ })).toBeVisible();
  await expect(education.getByText(/merit scholarship for all four years/)).toBeVisible();
  await expect(education.getByRole("link", { name: "NSITUlator" })).toHaveAttribute("href", "https://www.youtube.com/watch?v=ZU_RGEo2tsM");
  await expect(education.getByRole("link", { name: "NSITUlator" })).toHaveAttribute("target", "_blank");
  await expect(education.getByRole("link", { name: "College website ↗" })).toHaveAttribute("href", "https://nsut.ac.in/en/home");
  await expect(education.getByText(/I especially miss Shalini/)).toBeVisible();
  await expect(education.getByRole("link", { name: "Download my résumé ↗" })).toHaveAttribute("href", "/resume");
});

test("Markdown work details retain highlights and links", async ({ page }) => {
  await page.goto("/?work=udaan#work");
  const details = page.locator("#work article");
  await expect(details.locator("mark").filter({ hasText: "core UI platform team of four very talented developers" })).toBeVisible();
  await expect(details.getByRole("link", { name: "wondermart", exact: true })).toHaveAttribute("href", "https://wondermart.com");
});
