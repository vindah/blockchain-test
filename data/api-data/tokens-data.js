import { CHAINS, TOKEN_CON_ADDRESS } from './chain-data.js';

// Happy / positive token test cases
export const tokenHappyCases = [
  {
    name: 'USDC on Ethereum',
    query: {
      chain: 'eth',
      token: TOKEN_CON_ADDRESS.USDC_ETH,
    },
    expected: {
      symbol: 'USDC',
      address: TOKEN_CON_ADDRESS.USDC_ETH,
      chainId: CHAINS.ETHEREUM,
    },
  },
];

// invalid and missing token
export const tokenInvalidCases = [
  {
    name: 'invalid token address',
    query: {
      chain: 'eth',
      token: '0xINVALIDADDRESS',
    },
  },
  {
    name: 'missing token param',
    query: {
      chain: 'eth',
    },
  },
];
