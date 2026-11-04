## What changed

<!-- One or two sentences. -->

## Checklist

- [ ] Test titles start with a test case ID from `specs/` (e.g. `TC-LOGIN-005`)
- [ ] Tagged `@smoke` and/or `@regression` (AI Explorer output stays `@generated`)
- [ ] Locators and actions live in Page Objects; assertions stay in tests
- [ ] `npm run lint && npm run typecheck && npx playwright test` passes
- [ ] No secrets or hard-coded URLs (use `config/env.ts`)

## AI assistance

- [ ] AI-assisted (Claude Code / AI Explorer)
- [ ] I reviewed every line and ran the tests myself
- [ ] If a test failed because the app is wrong, I reported a bug instead of weakening the assertion
