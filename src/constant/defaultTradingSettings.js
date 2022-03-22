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
    { position: -8, multiples: 32 },
    { position: -13, multiples: 64 },
    { position: -21, multiples: 128 },
    { position: -34, multiples: 256 },
    { position: -55, multiples: 512 },
  ],
  advanceSettings: {
    earningCallback: 0.2,
    callbackForMarginCall: 0.2,
    initPeriod: 300,
  },
  strategy: 'simple-dca',
};

export default defaultTradingSettings;
