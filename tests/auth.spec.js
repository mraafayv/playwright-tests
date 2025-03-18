// @ts-check

import { test, expect } from "@playwright/test";

// Test 1
test.describe("Authentication Tests", () => {
  test("User should login with valid credentials", async ({ page }) => {
    await page.goto("/login");

    await page.locator("#email-input").fill("test@maddox123.ai");
    await page.locator("#password-input").fill("supersecure");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page).toHaveURL("/");
    await expect(page.getByRole("heading", { name: "Home" })).toHaveText(
      "Home"
    );
  });

  test("User login with invalid credentials should show error", async ({
    page,
  }) => {
    await page.goto("/login");

    await page.locator("#email-input").fill("random_user@maddox.ai");
    await page.locator("#password-input").fill("wrongpassword");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page).toHaveURL("/login");
    await expect(page.getByText("Invalid email or password.")).toBeVisible();
  });
});

