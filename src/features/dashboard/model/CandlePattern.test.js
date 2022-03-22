import CandlePattern from './CandlePattern';

// const dragonflydoji = { open: [300], high: [300], low: [1], close: [299], volume: [4] };
// const doji = { open: [300], high: [300], low: [1], close: [299], volume: [4] };

const data = { open: [5], high: [1], low: [300], close: [6], volume: [4] };
test('adds 1 + 2 to equal 3', () => {
  const candlePattern = new CandlePattern(data);
  console.log(candlePattern.dragonflyDoji());
  //   expect(sum(1, 2)).toBe(2);
});
