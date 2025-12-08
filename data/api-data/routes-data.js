import { CHAINS, TOKEN_CON_ADDRESS } from './chain-data.js';

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

const DEFAULT_OPTIONS = {
  bridges: {
    allow: ['all'],
  },
  exchanges: {
    allow: ['all'],
  },
};


export const routesHappyCases = [
  {
    name: 'bridge route: native ETH Ethereum → Polygon (1 → 137)',
    expectedType: 'BRIDGE',
    body: {
      fromChainId: 1,
      toChainId: 137,
      fromAmount: '10000000000000000',
      fromTokenAddress: ZERO_ADDRESS,
      toTokenAddress: ZERO_ADDRESS,
      options: DEFAULT_OPTIONS,
      allowSwitchChain: false,
      allowDestinationCall: true,
    },
  },
  {
    name: 'bridge route: USDC Ethereum → USDC Arbitrum (1 → 42161)',
    expectedType: 'BRIDGE',
    body: {
      fromChainId: 1,
      toChainId: 42161,
      fromAmount: '10000000',
      fromTokenAddress: TOKEN_CON_ADDRESS.USDC_ETH,
      toTokenAddress: TOKEN_CON_ADDRESS.USDC_ARB,
      options: DEFAULT_OPTIONS,
      allowSwitchChain: false,
      allowDestinationCall: true,
    },
  },
];


// Unsupported token pairs/routes
export const routesUnsupportedPairCases = [
  {
    name: 'unsupported toChainId – no routes expected',
    body: {
      fromChainId: CHAINS.ETHEREUM,
      toChainId: 999999,
      fromAmount: '10000000',
      fromTokenAddress: ZERO_ADDRESS,
      toTokenAddress: ZERO_ADDRESS,
      options: DEFAULT_OPTIONS,
      allowSwitchChain: false,
      allowDestinationCall: true,
    },
  },
];

// Zero/negative amounts
export const routesZeroOrNegativeAmountCases = [
  {
    name: 'zero fromAmount',
    body: {
      fromChainId: CHAINS.ETHEREUM,
      toChainId: CHAINS.POLYGON,
      fromAmount: '0',
      fromTokenAddress: ZERO_ADDRESS,
      toTokenAddress: ZERO_ADDRESS,
      options: DEFAULT_OPTIONS,
      allowSwitchChain: false,
      allowDestinationCall: true,
    },
  },
  {
    name: 'negative fromAmount',
    body: {
      fromChainId: CHAINS.ETHEREUM,
      toChainId: CHAINS.POLYGON,
      fromAmount: '-10000000000000000',
      fromTokenAddress: ZERO_ADDRESS,
      toTokenAddress: ZERO_ADDRESS,
      options: DEFAULT_OPTIONS,
      allowSwitchChain: false,
      allowDestinationCall: true,
    },
  },
];

// Missing required fields
export const routesMissingFieldCases = [
  {
    // no token address
    name: 'missing toTokenAddress',
    body: {
      fromChainId: CHAINS.ETHEREUM,
      toChainId: CHAINS.POLYGON,
      fromAmount: '10000000000000000',
      fromTokenAddress: ZERO_ADDRESS,
      options: DEFAULT_OPTIONS,
      allowSwitchChain: false,
      allowDestinationCall: true,
    },
  },
];

// using this to check rejection of same token as source & destination
export const routesSameTokenRequestBody = {
  name: 'same-chain route: native ETH on Ethereum (1 → 1) [swap]',
  expectedType: 'SWAP',
  body: {
    fromChainId: CHAINS.ETHEREUM,
    toChainId: CHAINS.ETHEREUM,
    fromAmount: '10000000000000000',
    fromTokenAddress: ZERO_ADDRESS,
    toTokenAddress: ZERO_ADDRESS,
    options: DEFAULT_OPTIONS,
    allowSwitchChain: false,
    allowDestinationCall: true,
  },
}