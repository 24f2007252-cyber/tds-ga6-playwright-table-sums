import { fileURLToPath } from 'node:url';

const SEEDS = Array.from({ length: 10 }, (_, index) => index + 56);

export function sumTableCells(cellTexts) {
  return cellTexts.reduce((total, text) => {
    const value = Number(text.trim().replaceAll(',', ''));
    return Number.isFinite(value) ? total + value : total;
  }, 0);
}

export async function scrapeTableSums(seeds = SEEDS) {
  const { chromium } = await import('playwright');
  const browser = await chromium.launch({ headless: true });

  try {
    const page = await browser.newPage();
    let total = 0;

    for (const seed of seeds) {
      const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
      await page.goto(url, { waitUntil: 'networkidle' });
      await page.locator('table').first().waitFor();

      const cells = await page.locator('table td').allTextContents();
      const pageTotal = sumTableCells(cells);
      console.log(`Seed ${seed}: ${pageTotal}`);
      total += pageTotal;
    }

    return total;
  } finally {
    await browser.close();
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const total = await scrapeTableSums();
  console.log(`TOTAL: ${total}`);
}
