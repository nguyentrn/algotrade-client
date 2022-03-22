import { max, min, sum } from 'lodash';

const getFirstPoint = (times, interval) => {
  const firstPoint = null;
  let i = 0;
  while (firstPoint === null && i < times.length) {
    if (!(new Date(times[i]).getTime() % (interval * 60 * 1000))) {
      return i;
    }
    i++;
  }
  return firstPoint;
};

const createOHLCVsFrom1m = (m1s, interval = 5) => {
  const firstPoint = getFirstPoint(m1s.time, interval);
  const ohlcvs = {
    time: [],
    open: [],
    high: [],
    low: [],
    close: [],
    volume: [],
  };
  for (let i = firstPoint; i <= m1s.time.length; i += interval) {
    if (i < interval) {
      continue;
    }
    ohlcvs.time.push(m1s.time[i - interval]);
    ohlcvs.open.push(m1s.open[i - interval]);
    ohlcvs.high.push(max(m1s.high.slice(i - interval, i)));
    ohlcvs.low.push(min(m1s.low.slice(i - interval, i)));
    ohlcvs.close.push(m1s.close[i - 1]);
    ohlcvs.volume.push(sum(m1s.volume.slice(i - interval, i)));
  }
  return ohlcvs;
};

export default createOHLCVsFrom1m;
