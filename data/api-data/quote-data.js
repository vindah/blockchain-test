import { CHAINS, TOKEN_CON_ADDRESS } from './chain-data.js';

export const FROM_WALLET_ADDRESS = '0x552008c0f6870c2f77e5Cc1d2eb9bdff03e30Ea0';

export const TO_WALLET_ADDRESS = '0x85B0cdeb92180e4f4390B4c6B7118ec1d80e218F';

// Successful quote cases
export const quoteHappyCases = [
  {
    name: 'same-chain swap: ETH → USDC on Ethereum (chain 1)',
    expectedType: 'SWAP',
    query: {
      fromChain: CHAINS.ETHEREUM,
      toChain: CHAINS.ETHEREUM,
      fromToken: 'ETH',
      toToken: 'USDC',
      fromAddress: TOKEN_CON_ADDRESS.ETH,
      toAddress: TOKEN_CON_ADDRESS.USDC_ETH,
      fromAmount: '10000000000000000',
    },
  },
  {
    name: 'same-chain swap: USDC → USDT on Ethereum (chain 1)',
    expectedType: 'SWAP',
    query: {
      fromChain: CHAINS.ETHEREUM,
      toChain: CHAINS.ETHEREUM,
      fromToken: 'USDC',
      toToken: 'USDT',
      fromAddress: TOKEN_CON_ADDRESS.USDC_ETH,
      toAddress: TOKEN_CON_ADDRESS.USDT_ETH,
      fromAmount: '10000000',
    },
  },
  {
    name: 'cross-chain bridge: USDC (Ethereum) → USDC (Polygon) [bridge]',
    expectedType: 'BRIDGE',
    query: {
      fromChain: CHAINS.ETHEREUM,
      toChain: CHAINS.POLYGON,
      fromToken: 'USDC',
      toToken: 'USDC',
      fromAddress: TOKEN_CON_ADDRESS.USDC_ETH,
      toAddress: TOKEN_CON_ADDRESS.USDC_POLY,
      fromAmount: '10000000',
    },
  },
];


// Invalid token symbols (mint/symbol)
export const quoteInvalidTokenCases = [
  {
    name: 'invalid fromToken symbol',
    query: {
      fromChain: CHAINS.ETHEREUM,
      toChain: CHAINS.ETHEREUM,
      fromToken: 'INVALID_TOKEN',
      toToken: 'USDC',
      fromAddress: FROM_WALLET_ADDRESS,
      toAddress: TO_WALLET_ADDRESS,
      fromAmount: '10000000',
    },
  },
  {
    name: 'invalid toToken symbol',
    query: {
      fromChain: CHAINS.ETHEREUM,
      toChain: CHAINS.ETHEREUM,
      fromToken: 'ETH',
      toToken: 'INVALID_TOKEN',
      fromAddress: FROM_WALLET_ADDRESS,
      toAddress: TO_WALLET_ADDRESS,
      fromAmount: '10000000',
    },
  },
];

// Zero / negative amounts
export const quoteZeroOrNegativeAmountCases = [
  {
    name: 'zero fromAmount',
    query: {
      fromChain: CHAINS.ETHEREUM,
      toChain: CHAINS.ETHEREUM,
      fromToken: 'ETH',
      toToken: 'USDC',
      fromAddress: FROM_WALLET_ADDRESS,
      toAddress: TO_WALLET_ADDRESS,
      fromAmount: '0',
    },
  },
  {
    name: 'negative fromAmount',
    query: {
      fromChain: CHAINS.ETHEREUM,
      toChain: CHAINS.ETHEREUM,
      fromToken: 'ETH',
      toToken: 'USDC',
      fromAddress: FROM_WALLET_ADDRESS,
      toAddress: TO_WALLET_ADDRESS,
      fromAmount: '-10000000000000000',
    },
  },
];

// Missing required fields
export const quoteMissingFieldCases = [
  {
    // I removed fromToken param
    name: 'missing fromToken',
    query: {
      fromChain: CHAINS.ETHEREUM,
      toChain: CHAINS.ETHEREUM,
      toToken: 'USDC',
      fromAddress: FROM_WALLET_ADDRESS,
      toAddress: TO_WALLET_ADDRESS,
      fromAmount: '10000000',
    },
  },
  {
    // i removed the from chain param
    name: 'missing fromChain',
    query: {
      toChain: CHAINS.ETHEREUM,
      fromToken: 'ETH',
      toToken: 'USDC',
      fromAddress: FROM_WALLET_ADDRESS,
      toAddress: TO_WALLET_ADDRESS,
      fromAmount: '10000000',
    },
  },
];

// I added this for other auth tests
export const quoteBaseValidRequestParam = {
  fromChain: CHAINS.ETHEREUM,
  toChain: CHAINS.ETHEREUM,
  fromToken: 'ETH',
  toToken: 'USDC',
  fromAddress: FROM_WALLET_ADDRESS,
  toAddress: TO_WALLET_ADDRESS,
  fromAmount: '10000000',
};