import { expect, test } from "@playwright/test";
import { assertClaimResponseSchema, ClaimsApi } from "../../api/claimsApi";
import { claimTestData, users } from "../../fixtures/testData";

test.describe("Claims API", () => {
  test.describe.configure({ mode: "serial" });

  test("submit a new claim through the API", async ({ request }) => {
    const claimsApi = new ClaimsApi(request);

    const loginResponse = await claimsApi.login(
      users.claimantUser.email,
      users.claimantUser.password,
    );
    expect(loginResponse.status()).toBe(200);

    const response = await claimsApi.submitClaim(claimTestData);

    const responseBody = await response.json();

    expect(response.status()).toBe(201);
    assertClaimResponseSchema(responseBody);
    expect(responseBody).toHaveProperty("claimId");
    expect(responseBody.description).toBe(claimTestData.description);
    expect(responseBody.claimAmount).toBe(claimTestData.claimAmount);
    expect(responseBody.status).toBe("SUBMITTED");
  });

  test("rejects an invalid claim payload", async ({ request }) => {
    const claimsApi = new ClaimsApi(request);
    const loginResponse = await claimsApi.login(
      users.claimantUser.email,
      users.claimantUser.password,
    );
    expect(loginResponse.status()).toBe(200);

    const response = await claimsApi.submitClaim({
      incidentDate: "2099-01-01",
      incidentLocation: "12 Main Street",
      description: "Too short",
      claimAmount: 0,
    });
    const body = await response.json();

    expect(response.status()).toBe(400);
    expect(body).toMatchObject({ status: 400 });
    expect(body).toHaveProperty("title");
    expect(body).toHaveProperty("detail");
  });

  test("rejects a claim when a required field is missing", async ({ request }) => {
    const claimsApi = new ClaimsApi(request);
    const loginResponse = await claimsApi.login(
      users.claimantUser.email,
      users.claimantUser.password,
    );
    expect(loginResponse.status()).toBe(200);

    const response = await claimsApi.submitClaim({
      incidentDate: claimTestData.incidentDate,
      incidentLocation: claimTestData.incidentLocation,
      claimAmount: claimTestData.claimAmount,
    });
    const body = await response.json();

    expect(response.status()).toBe(400);
    expect(body).toMatchObject({ status: 400 });
    expect(body).toHaveProperty("title");
    expect(body).toHaveProperty("detail");
  });
});
