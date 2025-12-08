import { test, expect } from '@playwright/test';
import {
  routesHappyCases,
  routesUnsupportedPairCases,
  routesZeroOrNegativeAmountCases,
  routesMissingFieldCases,
  routesSameTokenRequestBody,
} from '../../data/api-data/routes-data.js';
import { expectErrorOrNoRoutes } from '../../base/api-assertions.js';

const BASE_URL = process.env.API_URL?? 'https://li.quest';

test.describe('POST /v1/advanced/routes – happy paths', () => {
  for (const tc of routesHappyCases) {
    test(tc.name, async ({ request }) => {
      const response = await request.post(`${BASE_URL}/v1/advanced/routes`, {
        data: tc.body,
      });

      expect(response.status()).toBe(200);

      const body = await response.json();

      expect.soft(Array.isArray(body.routes)).toBe(true);
      expect.soft(body.routes.length).toBeGreaterThan(0);

      const firstRoute = body.routes[0];

      expect.soft(firstRoute.fromChainId).toBe(tc.body.fromChainId);
      expect.soft(firstRoute.toChainId).toBe(tc.body.toChainId);

      if (tc.expectedType === 'SWAP') {
        expect.soft(firstRoute.fromChainId).toBe(firstRoute.toChainId);
      } else if (tc.expectedType === 'BRIDGE') {
       expect.soft(firstRoute.fromChainId).not.toBe(firstRoute.toChainId);
      }

      expect.soft(firstRoute.fromAmount).toBeDefined();
      expect.soft(firstRoute.toAmount).toBeDefined();
    });
  }
});

test.describe('POST /v1/advanced/routes – unsupported pairs / routes', () => {
  for (const tc of routesUnsupportedPairCases) {
    test(tc.name, async ({ request }) => {
      const response = await request.post(`${BASE_URL}/v1/advanced/routes`, {
        data: tc.body,
      });

      await expectErrorOrNoRoutes(response);
    });
  }
});

test.describe('POST /v1/advanced/routes – zero / negative amounts', () => {
  for (const tc of routesZeroOrNegativeAmountCases) {
    test(tc.name, async ({ request }) => {
      const response = await request.post(`${BASE_URL}/v1/advanced/routes`, {
        data: tc.body,
      });

      await expectErrorOrNoRoutes(response);
    });
  }
});

test.describe('POST /v1/advanced/routes – missing required fields', () => {
  for (const tc of routesMissingFieldCases) {
    test(tc.name, async ({ request }) => {
      const response = await request.post(`${BASE_URL}/v1/advanced/routes`, {
        data: tc.body,
      });

      await expectErrorOrNoRoutes(response);
    });
  }
});


test('POST /v1/advanced/routes – should reject same token as source & destination', async ({ request }) => {

  const response = await request.post(`${BASE_URL}/v1/advanced/routes`, {
    data: routesSameTokenRequestBody.body
  });

  expect.soft(response.status()).toBeGreaterThanOrEqual(400);

  const body = await response.json();

  expect.soft(body.code).toBe(1011);
  expect.soft(body.message).toContain('same token cannot be used');
});
