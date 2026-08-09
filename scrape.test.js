import test from 'node:test';
import assert from 'node:assert/strict';

import { sumTableCells } from './scrape.js';

test('sums signed, decimal, and comma-formatted table cell values', () => {
  assert.equal(sumTableCells(['1,200', '-3.5', '8', 'not a number']), 1204.5);
});
