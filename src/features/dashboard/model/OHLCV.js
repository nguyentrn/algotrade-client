import dayjs from 'dayjs';
import { max, min, average } from 'simple-statistics';
import { OBV, RSI, MACD } from 'technicalindicators';
import CandlePattern from './CandlePattern';
import createOHLCVsFrom1m from './createOHLCVsFrom1m';

const sma = (values, period) => average(values.slice(period * -1));

const INTERVALS = [3, 5, 15, 30, 60, 120, 240, 360, 480, 720];
const formatTimeframe = (interval) => `${interval < 60 ? interval : interval / 60}${interval < 60 ? 'm' : 'h'}`;
class OHLCV {
  constructor(ohlcvs) {
    this['1m'] = ohlcvs;
    INTERVALS.forEach((interval) => {
      this[formatTimeframe(interval)] = createOHLCVsFrom1m(this['1m'], interval);
    });
  }

  getLastTime(timeframe) {
    const times = this[timeframe].time;
    return times[times.length - 1];
  }

  getCloseFrom(timeframe, amount) {
    const { close } = this[timeframe];
    return amount ? close.slice(amount * -1) : close;
  }

  getVolumeFrom(timeframe, amount) {
    const { volume } = this[timeframe];
    return amount ? volume.slice(amount * -1) : volume;
  }

  getOHLCFrom(timeframe, amount) {
    return {
      open: this[timeframe].open.slice(amount * -1),
      high: this[timeframe].high.slice(amount * -1),
      low: this[timeframe].low.slice(amount * -1),
      close: this.getCloseFrom(timeframe, amount),
    };
  }

  getOHLCVFrom(timeframe, amount) {
    return {
      ...this.getOHLCFrom(timeframe, amount),
      time: this[timeframe].time.slice(amount * -1),
      volume: this.getVolumeFrom(timeframe, amount * -1),
    };
  }

  min(amount = 50) {
    return min(this.getCloseFrom('1m', amount));
  }

  max(amount = 50) {
    return max(this.getCloseFrom('1m', amount));
  }

  calculateOBV(timeframe, amount) {
    return OBV.calculate({
      close: this.getCloseFrom(timeframe, amount),
      volume: this.getVolumeFrom(timeframe, amount),
    });
  }

  calculateRSI(timeframe = '1m', period, amount) {
    return RSI.calculate({
      values: this.getCloseFrom(timeframe, amount),
      period,
    });
  }

  calculateMACD(timeframe = '1m', period, amount) {
    return MACD.calculate({
      values: this.getCloseFrom(timeframe, amount),
      fastPeriod: period?.fastPeriod || 5,
      slowPeriod: period?.slowPeriod || 8,
      signalPeriod: period?.signalPeriod || 3,
      SimpleMAOscillator: false,
      SimpleMASignal: false,
    });
  }
  getCandlePatterns() {
    const res = [];

    INTERVALS.map((interval) => {
      const timeframe = formatTimeframe(interval);
      const candlePatterns = new CandlePattern(this[timeframe]);
      candlePatterns.get().forEach((r) =>
        res.push({
          ...r,
          timeframe,
          lastCandle: dayjs(this[timeframe].time[this[timeframe].time.length - 1]).format('HH:mm DD/MM'),
          color: r.type === 'bearish' ? 'red.500' : r.type === 'bullish' ? 'green.500' : 'gray.700',
        })
      );
    });
    return res;
  }
}

export default OHLCV;
