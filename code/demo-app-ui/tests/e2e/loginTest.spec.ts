import { expect, test } from "../fixtures/pageFixtures";
import { loginUsers, users, messages } from "../../fixtures/testData";
import { loginLocators } from "@/pages/locators";

test.describe("Login Functionality Testing", () => {
  for (const user of loginUsers) {
    test(`Login positive scenario - ${user.role}`, async ({ page, loginPage }) => {

      await loginPage.login(user.email, user.password);

      await page.waitForURL(user.url, { timeout: 10000 });

      const welcomeText = await loginPage.getWelcomeText();

      expect(welcomeText).toBe(user.welcomeMessage);

      await loginPage.logout();
    });
  }

  test("Login negative scenario - Invalid credentials", async ({ page, loginPage }) => {

    await loginPage.login(users.invalidUser.email, users.invalidUser.password);

    const errorMessage = await loginLocators(page).errorMessage.innerText();
    expect(errorMessage).toBe(messages.invalidCredentials);
  });
});
