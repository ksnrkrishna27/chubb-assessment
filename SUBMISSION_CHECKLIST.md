# THA Submission Checklist

| Deliverable | Location | Status |
|---|---|---|
| AI Journal | `AI_JOURNAL.md`, `AI_COLLABORATION_NOTES.md` | Complete |
| Architecture diagram | `ARCHITECTURE.md`, `architecture-diagram.excalidraw`, `ss-demo-app.png` | Complete |
| Test strategy | `TESTING_APPROACH.md` | Complete |
| Test cases | `TEST_CASES.md` | Complete |
| Playwright UI tests | `code/demo-app-ui/tests/e2e/*.spec.ts` and matching `.md` files | Complete |
| API tests | `code/demo-app-ui/tests/e2e/submitClaim.api.spec.ts` and `api/claimsApi.ts` | Complete |
| Defect report | `DEFECT_REPORT.md` | Complete - no confirmed defect found; evidence policy documented |

## Final verification

- [ ] Run the full Playwright suite against the healthy local stack.
- [ ] Confirm `.env` is ignored and `.env.example` contains placeholders only.
- [ ] Review `playwright-report/` for HTML/JUnit results and screenshots/videos.
- [ ] Commit and push the final changes.
