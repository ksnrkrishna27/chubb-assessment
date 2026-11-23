# Test Cases

The catalogue uses the assessment format: ID, scenario, preconditions, test data, steps, expected result, type, and automation reference.

Priority is High for authentication, claim creation, lifecycle, and API contract coverage; Medium for layout and logout coverage. The automated cases were previously executed successfully where noted by the repository test history.

| ID | Scenario | Preconditions | Test data | Steps | Expected result | Type | Automation |
|---|---|---|---|---|---|---|---|
| TC-001 | Claimant login | Stack healthy | Claimant credentials from `.env` | Submit valid credentials | Redirect to `/claims`; claimant welcome is shown | Positive | `loginTest.spec.ts` |
| TC-002 | Admin login | Stack healthy | Admin credentials from `.env` | Submit valid credentials | Redirect to `/admin/dashboard`; admin welcome is shown | Positive | `loginTest.spec.ts` |
| TC-003 | Invalid login | Stack healthy | Invalid email/password | Submit invalid credentials | Invalid-credentials message is shown | Negative | `loginTest.spec.ts` |
| TC-004 | Logout | User is logged in | User session | Select logout | Login page is displayed | Positive | `loginTest.spec.ts` |
| TC-005 | Claims page layout | Claimant is logged in | None | Open claims page | Submit button and expected table headers are visible | Positive | `claimPageLayout.spec.ts` |
| TC-006 | Submit from button | Claimant is logged in | Valid date, address, amount, description | Complete wizard from Submit New Claim | First row contains the submitted description and amount | Positive | `claimSubmition.spec.ts` |
| TC-007 | Submit from tab | Claimant is logged in | Valid claim data | Complete wizard from Submit Claim tab | New claim is created with expected values | Positive | `claimSubmition.spec.ts` |
| TC-008 | Description minimum length | Claim form is on step two | 9-character then valid description | Enter each value and inspect Next | Next is disabled for nine characters and enabled for valid text | Negative/Positive | `claimSubmition.spec.ts` |
| TC-009 | Admin sees claimant claim | Both roles available | Fresh valid claim | Submit as claimant; inspect as admin | Claim ID, amount, and Submitted status match | Positive | `claimLifecycle.spec.ts` |
| TC-010 | Status lifecycle | Claim exists; both roles logged in | Supported status values | Update as admin; refresh claimant view | Claimant sees selected status | Positive | `claimLifecycle.spec.ts` |
| TC-011 | API claim contract | BFF healthy; claimant authenticated | Valid claim JSON | POST `/api/claims` | HTTP 201 and required response fields have expected types/values | Positive | `submitClaim.api.spec.ts` |
| TC-012 | API invalid claim | BFF healthy; claimant authenticated | Future date, short description, invalid amount | POST invalid payload | HTTP 400 and validation Problem Details are returned | Negative | `submitClaim.api.spec.ts` |
| TC-013 | API missing input | BFF healthy; claimant authenticated | Payload without `description` | POST incomplete payload | HTTP 400 and validation Problem Details are returned | Negative | `submitClaim.api.spec.ts` |

## Test data

Credentials are supplied through environment variables. Claim dates, addresses, descriptions, and amounts are defined or generated in `code/demo-app-ui/fixtures/testData.ts`; secrets are not stored in source control.
