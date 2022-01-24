import { scaleTime } from '@visx/scale';
import { extent } from 'd3-array';
import { MARGIN } from './variables';

const getDate = (d) => d.time;

const getTimeScale = ({ width, height, ohlcvs }) => {
  const timeScale = scaleTime({
    domain: extent(ohlcvs, getDate),
  });

  timeScale.range([0, width - MARGIN]);
  return timeScale;
};

export default getTimeScale;
