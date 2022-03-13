const defaultTradingSettings = {
  initialAmount: 15,
  takeProfit: 1,
  stopLoss: -100,
  isDCA: true,
  entryPoints: [
    { position: -1, multiples: 2 },
    { position: -2, multiples: 4 },
    { position: -3, multiples: 8 },
    { position: -5, multiples: 16 },
  ],
  advanceSettings: {
    earningCallback: 0.2,
    callbackForMarginCall: 0.2,
    initPeriod: 120,
  },
  strategy: 'simple-dca',
};

export default defaultTradingSettings;
