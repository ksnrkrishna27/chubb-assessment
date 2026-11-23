import { test as base } from "@playwright/test";
import { ClaimsPage } from "../../pages/claimsPage";
import { LoginPage } from "../../pages/loginPage";

type PageFixtures = {
  loginPage: LoginPage;
  claimsPage: ClaimsPage;
};

export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  claimsPage: async ({ page }, use) => {
    await use(new ClaimsPage(page));
  },
});

export { expect } from "@playwright/test";
