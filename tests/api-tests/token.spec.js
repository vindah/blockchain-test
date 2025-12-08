import { test, expect } from '@playwright/test';
import {
  tokenHappyCases,
  tokenInvalidCases,
} from '../../data/api-data/tokens-data.js';
import { expectErrorResponse } from '../../base/api-assertions.js';

const BASE_URL = process.env.API_URL ?? 'https://li.quest';

test.describe('GET /v1/token - get token and price', () => {
  test.describe.configure({ mode: 'serial' });

  //I made it this way so that other objects can be added to the tokens array to check for other token info.
  for (const tc of tokenHappyCases) {
    test(tc.name, async ({ request }) => {
      const response = await request.get(`${BASE_URL}/v1/token`, {
        params: tc.query,
      });

      const status = response.status();
      expect(status).toBe(200);

      const body = await response.json();

      if (tc.expected.symbol) {
        expect(body).toHaveProperty('symbol', tc.expected.symbol);
      }
      if (tc.expected.address) {
        expect(body).toHaveProperty('address', tc.expected.address);
      }
      if (tc.expected.chainId !== undefined) {
        expect(Number(body.chainId)).toBe(Number(tc.expected.chainId));
      }

      if (body.priceUSD !== undefined && tc.expected.symbol === 'USDC') {
        expect(String(body.priceUSD)).toContain('0.999');

        const price = Number(body.priceUSD);
        expect(price).toBeGreaterThan(0.90);
        expect(price).toBeLessThan(1.10);
      }
    });
  }
});

test.describe('GET /v1/token -invalid token tests', () => {
  for (const tc of tokenInvalidCases) {
    test(tc.name, async ({ request }) => {
      const response = await request.get(`${BASE_URL}/v1/token`, {
        params: tc.query,
      });
      await expectErrorResponse(response);
    });
  }
});
