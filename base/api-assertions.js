import { expect } from '@playwright/test';


export async function expectErrorResponse(response) {
  const status = response.status();
  expect(
    status,
    `Expected error status (>= 400) but got ${status}`
  ).toBeGreaterThanOrEqual(400);

  let body = null;
  try {
    body = await response.json();
  } catch {

  }

  if (body) {
    expect(
      body.error || body.message || body.status || body.code,
      'error/message field should be present in error response body'
    ).toBeTruthy();
  }
}


export async function expectErrorOrNoRoutes(response) {
  const status = response.status();

  if (status >= 400) {
    
    await expectErrorResponse(response);
    return;
  }
  const body = await response.json();

  expect(
    Array.isArray(body.routes),
    'routes should be an array when status is 200'
  ).toBe(true);

  expect(
    body.routes.length,
    'routes array should be empty for unsupported pairs'
  ).toBe(0);
}
