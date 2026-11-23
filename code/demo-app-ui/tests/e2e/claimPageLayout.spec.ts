import { expect, test } from "../fixtures/pageFixtures";
import { loginUsers, users, claimsUIData } from "../../fixtures/testData";

test.describe("Claim Page Layout Testing", () => {
  test("Claim Page Layout - Verify UI Elements", async ({ page, loginPage, claimsPage }) => {
    await loginPage.login(
      users.claimantUser.email,
      users.claimantUser.password,
    );

    await page.waitForURL(loginUsers[0].url, { timeout: 10000 });

    await claimsPage.validateClaimSubmitButton();

    const claimTableHeaders = await claimsPage.getClaimTableHeaders();
    expect(claimTableHeaders).toEqual(claimsUIData.claimTableHeaders);
  });
});
