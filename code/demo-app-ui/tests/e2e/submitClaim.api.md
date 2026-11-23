# Claim Submission API Test

This document describes the scenario covered by `submitClaim.api.spec.ts`.

## Covered scenario

- Authenticates as a claimant through the authentication API.
- Submits a new claim through `POST /api/claims`.
- Logs the API response body to the test output.
- Verifies that the response status is `201`.
- Verifies that a claim ID is returned.
- Verifies that the description and claim amount match the submitted data.
- Verifies that the initial claim status is `SUBMITTED`.
- Validates the response contract: required string fields are present and `claimAmount` is numeric.
- Rejects an invalid claim payload with HTTP `400` and validation Problem Details.
- Rejects a request missing the required `description` field with HTTP `400`.

## Test design

API request and authentication handling are kept in `api/claimsApi.ts`. The spec file contains only the test flow and response assertions.

The response schema check is implemented in `assertClaimResponseSchema`; it is intentionally dependency-free so the assessment can run with the existing package set.

## Execution

Run the API test from the `demo-app-ui` directory:

```powershell
npx playwright test tests/e2e/submitClaim.api.spec.ts
```
