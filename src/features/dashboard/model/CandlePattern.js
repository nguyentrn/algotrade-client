import { max, min, average } from 'simple-statistics';

const sma = (values, period) => average(values.slice(period * -1));

class CandlePattern {
  constructor(ohlcvs) {
    this.time = ohlcvs.time;
    this.open = ohlcvs.open;
    this.high = ohlcvs.high;
    this.low = ohlcvs.low;
    this.close = ohlcvs.close;
    this.volume = ohlcvs.volume;
  }

  os(amount) {
    return this.open.slice(amount * -1);
  }
  hs(amount) {
    return this.high.slice(amount * -1);
  }
  ls(amount) {
    return this.low.slice(amount * -1);
  }
  cs(amount) {
    return this.close.slice(amount * -1);
  }
  vs(amount) {
    return this.volume.slice(amount * -1);
  }

  o(position) {
    return this.os(position)[0];
  }
  h(position) {
    return this.hs(position)[0];
  }
  l(position) {
    return this.ls(position)[0];
  }
  c(position) {
    return this.cs(position)[0];
  }
  v(position) {
    return this.vs(position)[0];
  }

  avgh(amount) {
    return sma(this.hs(amount));
  }
  avgl(amount) {
    return sma(this.ls(amount));
  }
  minl(amount) {
    return min(this.ls(amount));
  }
  maxh(amount) {
    return max(this.hs(amount));
  }
  stoc(period) {
    return ((this.c(1) - this.minl(period)) / (this.maxh(period) - this.minl(period))) * 100;
  }

  highSubtractLow(position) {
    return this.h(position) - this.l(position);
  }
  openSubtractClose(position) {
    return this.o(position) - this.c(position);
  }
  closeSubtractOpen(position) {
    return this.c(position) - this.o(position);
  }

  //1 nen
  doji() {
    return 20 * Math.abs(this.openSubtractClose(1)) <= this.highSubtractLow(1);
  }
  trueDoji() {
    return this.o(1) === this.c(1);
  }
  risingThreeMethods() {
    return (
      10 * (this.c(2) - this.o(2)) >= 7 * (this.h(2) - this.l(2)) &&
      this.h(2) - this.l(2) >= this.avgh(20) - this.avgl(20) &&
      this.h(2) === this.maxh(6) &&
      2 * this.c(3) === 2 * this.o(2) + this.h(2) - this.l(2) &&
      this.o(3) > this.o(2) &&
      this.o(1) > this.o(2) &&
      5 * this.o(1) <= 3 * this.h(2) + 2 * this.l(2) &&
      this.c(1) > this.c(2)
    );
  }
  dragonflyDoji() {
    // bullish
    return (
      50 * Math.abs(this.openSubtractClose(1)) <= this.highSubtractLow(1) &&
      this.stoc(1) >= 70 &&
      this.highSubtractLow(1) >= this.avgh(10) - this.avgl(10) &&
      this.l(1) === this.minl(10)
    );
  }
  hammer() {
    // bullish
    return (
      5 * Math.abs(this.closeSubtractOpen(1)) <= this.highSubtractLow(1) &&
      10 * Math.abs(this.openSubtractClose(1)) >= this.highSubtractLow(1) &&
      2 * this.o(1) >= this.h(1) + this.l(1) &&
      this.stoc(1) >= 50 &&
      (20 * this.o(1) >= 19 * this.h(1) + this.l(1) || this.stoc(1) >= 95) &&
      10 * this.highSubtractLow(1) >= 8 * (this.avgh(10) - this.avgl(10)) &&
      this.l(1) === this.minl(5) &&
      this.highSubtractLow(1) > 0
    );
  }
  invertedHammer() {
    // bullish
    return (
      5 * Math.abs(this.openSubtractClose(1)) <= this.highSubtractLow(1) &&
      10 * Math.abs(this.openSubtractClose(1)) >= this.highSubtractLow(1) &&
      2 * (this.h(1) - this.o(1)) >= this.highSubtractLow(1) &&
      2 * (this.h(1) - this.c(1)) >= this.highSubtractLow(1) &&
      (2 * (this.o(1) - this.l(1)) <= this.highSubtractLow(1) ||
        20 * (this.c(1) - this.l(1)) <= this.highSubtractLow(1)) &&
      5 * this.highSubtractLow(1) >= 4 * (this.avgh(10) - this.avgl(10)) &&
      2 * this.o(1) <= this.h(2) + this.l(2) &&
      this.stoc(1) >= 50 &&
      this.l(1) === this.minl(5) &&
      this.highSubtractLow(1) > 0
    );
  }

  //2 nen
  bullishEngulfing() {
    // bullish
    return (
      this.o(2) > this.c(2) &&
      this.closeSubtractOpen(1) >= 0.7 * this.highSubtractLow(1) &&
      this.c(1) > this.o(2) &&
      this.c(2) > this.o(1) &&
      this.highSubtractLow(1) >= 1.2 * (this.avgh(10) - this.avgl(10))
    );
  }

  //3 nen
  morningStar() {
    // bullish
    return (
      this.o(2) > this.c(2) &&
      this.o(2) - this.c(2) > 0.3 * this.highSubtractLow(2) &&
      this.c(2) > this.o(3) &&
      2 * Math.abs(this.o(3) - this.c(3)) < Math.abs(this.o(2) - this.c(2)) &&
      this.highSubtractLow(3) > 3 * (this.c(2) - this.o(3)) &&
      this.c(1) > this.o(1) &&
      this.o(1) > this.o(3) &&
      this.o(1) > this.c(2)
    );
  }
  morningDojiStar() {
    // bullish
    return (
      this.o(2) - this.c(2) >= 0.7 * this.highSubtractLow(2) &&
      this.highSubtractLow(2) >= this.avgh(8) - this.avgl(8) &&
      this.closeSubtractOpen(1) >= 0.7 * this.highSubtractLow(1) &&
      this.o(1) > this.c(3) &&
      this.o(1) > this.o(3)
    );
  }

  piercingLine() {
    // bullish
    return (
      this.o(2) > this.c(2) &&
      this.h(2) - this.l(2) >= this.avgh(9) - this.avgl(9) &&
      this.o(1) < this.c(2) &&
      2 * this.c(1) > this.c(2) + this.o(2) &&
      this.c(1) < this.o(2)
    );
  }

  threeWhiteSoldier() {
    // bullish
    return (
      this.c(1) > this.c(4) &&
      this.c(4) > this.c(3) &&
      this.c(1) > this.o(1) &&
      this.c(4) > this.o(4) &&
      this.c(3) > this.o(3) &&
      2 * Math.abs(this.closeSubtractOpen(3)) > this.highSubtractLow(3) &&
      2 * Math.abs(this.closeSubtractOpen(4)) > this.highSubtractLow(4) &&
      this.h(1) - this.l(1) > this.avgh(21) - this.avgl(21) &&
      this.o(1) > this.o(4) &&
      this.o(1) < this.c(4) &&
      this.o(4) > this.o(3) &&
      this.o(4) < this.c(3) &&
      this.o(3) > this.o(2) &&
      this.o(3) < this.c(2) &&
      20 * this.c(1) > 17 * this.h(1) &&
      20 * this.c(4) > 17 * this.h(4) &&
      20 * this.c(3) > 17 * this.h(3)
    );
  }

  bearishEngulfing() {
    return (
      this.closeSubtractOpen(2) > 0 &&
      this.openSubtractClose(1) >= 0.7 * this.highSubtractLow(1) &&
      this.c(1) < this.o(2) &&
      this.o(1) > this.c(2) &&
      this.highSubtractLow(1) >= 1.2 * (this.avgh(10) - this.avgl(10))
    );
  }
  hangingMan() {
    return (
      Math.abs(this.openSubtractClose(1)) <= 0.02 * this.highSubtractLow(1) &&
      this.h(1) - this.c(1) <= 0.3 * this.highSubtractLow(1) &&
      this.highSubtractLow(1) >= this.avgh(10) - this.avgl(10) &&
      this.highSubtractLow(1) > 0 &&
      this.h(1) === this.maxh(10)
    );
  }

  compose() {
    return [
      {
        id: 'trueDoji',
        name: 'true Doji',
        type: 'continuation',
        candles: 1,
      },
      {
        id: 'doji',
        name: 'doji',
        type: 'continuation',
        candles: 1,
      },
      {
        id: 'dragonflyDoji',
        name: 'dragonfly Doji',
        type: 'continuation',
        candles: 1,
      },

      {
        id: 'risingThreeMethods',
        name: 'rising Three Methods',
        type: 'continuation',
        candles: 1,
      },

      {
        id: 'hammer',
        name: 'hammer',
        type: 'bullish',
        candles: 1,
      },
      {
        id: 'invertedHammer',
        name: 'inverted Hammer',
        type: 'bullish',
        candles: 1,
      },
      {
        id: 'bullishEngulfing',
        name: 'bullish Engulfing',
        type: 'bullish',
        candles: 2,
      },

      {
        id: 'morningStar',
        name: 'morning Star',
        type: 'bullish',
        candles: 2,
      },
      {
        id: 'morningDojiStar',
        name: 'morning Doji Star',
        type: 'bullish',
        candles: 2,
      },
      {
        id: 'piercingLine',
        name: 'piercing Line',
        type: 'bullish',
        candles: 2,
      },
      {
        id: 'threeWhiteSoldier',
        name: 'three White Soldier',
        type: 'bullish',
        candles: 3,
      },
      {
        id: 'hangingMan',
        name: 'hanging Man',
        type: 'bearish',
        candles: 1,
      },
      {
        id: 'bearishEngulfing',
        name: 'bearish Engulfing',
        type: 'bearish',
        candles: 2,
      },
    ];
  }

  get() {
    const candlePatterns = [];
    this.compose().map((pattern) => {
      const res = this[pattern.id]();
      if (res) {
        if (!(pattern.id === 'doji' && candlePatterns.find(({ id }) => id === 'trueDoji'))) {
          candlePatterns.push(pattern);
        }
      }
    });
    return candlePatterns;
  }
}

export default CandlePattern;
