export const fundManagementProps = [
  { prop: 'initialAmount', unit: '$', min: 10, max: undefined, precision: 2, step: 1 },
  { prop: 'takeProfit', unit: '%', min: 0, max: undefined, precision: 2, step: 0.1 },
  { prop: 'stopLoss', unit: '%', min: undefined, max: 0, precision: 2, step: 0.1 },
];

export const advancedStrategyProps = {
  'simple-dca': [
    { prop: 'earningCallback', unit: '$', min: 0.01, max: undefined, precision: 2, step: 0.1 },
    { prop: 'callbackForMarginCall', unit: '%', min: 0.01, max: undefined, precision: 2, step: 0.1 },
    { prop: 'initPeriod', unit: 'session', min: 1, max: 1440, precision: 0, step: 1 },
  ],
};
