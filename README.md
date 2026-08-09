# Playwright table sums

This repository uses Playwright in GitHub Actions to scrape every table from
seeds 56 through 65 and print the combined total in the workflow log.

Run it locally with:

```bash
npm ci
npx playwright install chromium
npm test
npm run scrape
```
