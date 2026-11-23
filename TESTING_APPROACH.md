# Testing Approach

## Objective

The assessment focuses on the highest-risk user journeys in the demo claims application. The initial priority is authentication and role-based access because all claimant and administrator workflows depend on successful login and correct redirection.

## Implemented coverage

### UI end-to-end tests

The Playwright login suite currently covers:

- Successful login for a claimant user.
- Successful login for an administrator user.
- Role-specific redirection after login.
- Role-specific welcome message verification.
- Invalid credentials.
- Logout after successful login.

The tests use a functional data-driven approach so the same positive-login flow is executed for both user roles. Page actions are kept in `pages/loginPage.ts`, locators are kept in `pages/locators.ts`, and test data is kept in `fixtures/testData.ts`.

### Claims UI and lifecycle tests

The Playwright suite also covers:

- Claims page layout and expected table headers.
- Claim submission through the `Submit New Claim` button.
- Claim submission through the `Submit Claim` navigation tab.
- Minimum description length validation.
- Visibility of a newly submitted claim to an administrator.
- Separate claimant and administrator browser contexts.
- Status transitions from `Submitted` to `Under Review` and `Rejected`.
- Status transitions from `Under Review` to `Approved`, `Rejected`, and `Submitted`.

### API test coverage

The API suite covers successful claim submission through `POST /api/claims` after claimant authentication. It verifies the `201` response, claim ID, description, amount, and initial `SUBMITTED` status. API request logic is kept in `api/claimsApi.ts`.

## Planned work not implemented due to time

The following areas were identified as valuable but were not completed in the available assessment time:

- Empty-field and invalid-email validation.
- GitHub Actions execution and validation for the repository.
- Implement a vault-based solution for securely storing credentials.
- Unauthenticated and role-based access validation.
- API negative and boundary validation tests.
- Backend integration and contract tests.
- Visual regression testing.
- Load or performance testing.

## Risk-based prioritization

Authentication was selected first because a failure there blocks every protected workflow. The next highest-risk journey is the end-to-end claim lifecycle: create a claim, process it as an administrator, and verify the resulting status for the claimant.

## Scope

### In scope

- Claimant and administrator login, redirects, welcome messages, and logout.
- Claim submission through both available UI entry points.
- Minimum description validation and claimant/admin claim visibility.
- Administrator status transitions and claimant-side status refresh.
- API claim submission, response contract checks, invalid input, and missing input.
- Playwright HTML/JUnit results plus screenshot and video evidence.

### Out of scope

- Production deployment, infrastructure hardening, and disaster recovery.
- Load/performance and visual pixel-comparison testing.
- Full backend unit, integration, contract, Kafka, and CDC execution.
- Vault provisioning and CI secret configuration.

## Risks and mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Authentication service is unavailable | Protected tests cannot start | Verify Docker health and login as an entry criterion. |
| Shared data changes between runs | First-row assertions may be unreliable | Run lifecycle tests serially and create a fresh claim per workflow. |
| Status transitions are business-rule dependent | Invalid transitions may be accepted unexpectedly | Cover supported transitions and assert the status after refresh. |
| Credentials are exposed in source control | Security and submission risk | Read credentials from `.env`; commit only `.env.example`. |
| UI markup changes | Locator failures | Prefer role, label, test-id, and semantic selectors. |

## Entry criteria

- Docker Desktop is running and the full application stack is healthy.
- UI is reachable at `http://localhost:3001` and BFF at `http://localhost:8090`.
- Local `.env` contains the four required test-user variables.
- Node dependencies and Playwright browsers are installed.

## Exit criteria

- All in-scope Playwright tests pass in a clean run.
- API tests pass, including schema, invalid-input, and missing-input checks.
- No credentials or runtime artifacts are committed.
- Playwright HTML/JUnit results and evidence are available.
- Coverage, limitations, test cases, architecture, AI journal, and defect status are documented.
