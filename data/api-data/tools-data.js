export const bridgeExchangeByIntegerID = [
  {
    name: 'SOLANA CHAIN (integer id)',
    query: {
      chains: 1151111081099710,
    },
  },
  {
    name: 'BTC CHAIN (integer id)',
    query: {
      chains: 20000000000001,
    },
  },
  {
    name: 'SUI CHAIN (integer id)',
    query: {
        chains: 9270000000000000,
    }
},
];

export const bridgeExchangeByStringKey = [
  {
    name: 'SOLANA CHAIN (string key)',
    query: {
      chains: 'sol',
    },
  },
  {
    name: 'BTC CHAIN (string key)',
    query: {
      chains: 'btc',
    },
  },
  {
    name: 'SUI CHAIN (string key)',
    query: {
      chains: 'sui',
    },
  },
];

// Invalid chain
export const bridgeExchangeInvalidCases = [
  {
    name: 'INVALID CHAIN (integer)',
    query: {
      chains: 9999999999999999,
    },
  },
  {
    name: 'INVALID CHAIN (string)',
    query: {
      chains: 'not-a-chain',
    },
  },
];
