import { test, expect } from '@playwright/test';
import {
  quoteHappyCases,
  quoteInvalidTokenCases,
  quoteZeroOrNegativeAmountCases,
  quoteMissingFieldCases,
  quoteBaseValidRequestParam,
} from '../../data/api-data/quote-data.js';
import { expectErrorResponse } from '../../base/api-assertions.js'; 

const BASE_URL = process.env.API_URL ?? 'https://li.quest';


test.describe('GET /v1/quote – happy paths', () => {
    test.describe.configure({ mode: 'serial' });

    for (const tc of quoteHappyCases) {
        test(tc.name, async ({ request }) => {
        const response = await request.get(`${BASE_URL}/v1/quote`, {
            params: tc.query,
        });

        const status = response.status();

        expect(status).toBe(200);

        const body = await response.json();

        expect(body).toHaveProperty('action');
        expect(body.action).toHaveProperty('fromToken');
        expect(body.action).toHaveProperty('toToken');

        const { fromToken, toToken } = body.action;

        // Tokens should match what we requested
        expect(fromToken.symbol).toBe(tc.query.fromToken);
        expect(toToken.symbol).toBe(tc.query.toToken);

        // Chain IDs should be correct
        expect(fromToken.chainId).toBe(Number(tc.query.fromChain));
        expect(toToken.chainId).toBe(Number(tc.query.toChain));

        // --- Selection logic assertions (swap vs bridge) ---
        if (tc.expectedType === 'SWAP') {
            expect(fromToken.chainId).toBe(
            toToken.chainId,
            );
        } else if (tc.expectedType === 'BRIDGE') {
            expect(fromToken.chainId).not.toBe(
            toToken.chainId,
            );
        }
        });
    }
});

test.describe('GET /v1/quote – invalid token symbols', () => {
  for (const tc of quoteInvalidTokenCases) {
    test(tc.name, async ({ request }) => {
      const response = await request.get(`${BASE_URL}/v1/quote`, {
        params: tc.query,
      });

      await expectErrorResponse(response);
    });
  }
});

test.describe('GET /v1/quote – zero / negative amounts', () => {
  for (const tc of quoteZeroOrNegativeAmountCases) {
    test(tc.name, async ({ request }) => {
      const response = await request.get(`${BASE_URL}/v1/quote`, {
        params: tc.query,
      });

      await expectErrorResponse(response);
    });
  }
});

test.describe('GET /v1/quote – missing required fields', () => {
  for (const tc of quoteMissingFieldCases) {
    test(tc.name, async ({ request }) => {
      const response = await request.get(`${BASE_URL}/v1/quote`, {
        params: tc.query,
      });

      await expectErrorResponse(response);
    });
  }
});

test.describe('GET /v1/quote – invalid header api key', () => {
  test('Rejects invalid API key header', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/v1/quote`, {
      params: quoteBaseValidRequestParam,
      headers: { 'x-lifi-api-key': '57086dc7-285d-4b7b-9131-4c5f3bebd2a7:0' }
    });

    expect(response.status()).toBe(401);

    const body = await response.json();

    expect(body.message).toContain('Invalid API key');
    expect(body.code).toBe(1010);
  });
});
