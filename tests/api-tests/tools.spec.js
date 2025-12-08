import { test, expect } from '@playwright/test';
import {
  bridgeExchangeByIntegerID,
  bridgeExchangeByStringKey,
  bridgeExchangeInvalidCases,
} from '../../data/api-data/tools-data.js';
import { expectErrorResponse } from '../../base/api-assertions.js';

const BASE_URL = process.env.API_URL ?? 'https://li.quest';


test.describe('GET /v1/tools – integer chain IDs (happy)', () => {
  test.describe.configure({ mode: 'serial' });

  for (const tc of bridgeExchangeByIntegerID) {
    test(tc.name, async ({ request }) => {
      const response = await request.get(`${BASE_URL}/v1/tools`, {
        params: tc.query,
      });

      const status = response.status();
      expect(status).toBe(200);

      const body = await response.json();

      expect(body).toHaveProperty('bridges');
      expect(body).toHaveProperty('exchanges');

      expect(Array.isArray(body.bridges)).toBe(true);
      expect(Array.isArray(body.exchanges)).toBe(true);
    });
  }
});


test.describe('GET /v1/tools – string chain keys (happy)', () => {
  test.describe.configure({ mode: 'serial' });

  for (const tc of bridgeExchangeByStringKey) {
    test(tc.name, async ({ request }) => {
      const response = await request.get(`${BASE_URL}/v1/tools`, {
        params: tc.query,
      });

      const status = response.status();
      expect(status).toBe(200);

      const body = await response.json();

      expect(body).toHaveProperty('bridges');
      expect(body).toHaveProperty('exchanges');

      expect(Array.isArray(body.bridges)).toBe(true);
      expect(Array.isArray(body.exchanges)).toBe(true);
    });
  }
});


test.describe('GET /v1/tools – invalid chains', () => {
  for (const tc of bridgeExchangeInvalidCases) {
    test(tc.name, async ({ request }) => {
      const response = await request.get(`${BASE_URL}/v1/tools`, {
        params: tc.query,
      });

      await expectErrorResponse(response);
    });
  }
});

