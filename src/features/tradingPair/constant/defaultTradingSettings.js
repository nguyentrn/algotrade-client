const defaultTradingSettings = {
  initialAmount: 15,
  takeProfit: 0.1,
  stopLoss: -5,
  isDCA: true,
  entryPoints: [
    { position: -0.39, multiples: 2 },
    { position: -1.39, multiples: 4 },
    { position: -3.68, multiples: 8 },
  ],
  advanceSettings: {
    earningCallback: 0.1,
    callbackForMarginCall: 0.2,
  },
  strategy: 'simple-dca',
};

export default defaultTradingSettings;
