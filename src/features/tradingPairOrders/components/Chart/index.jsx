import React, { useEffect, useState } from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import { useMeasure } from 'react-use';
import dayjs from 'dayjs';
import { AxisBottom } from '@visx/axis';

import colors from '../../../../theme/colors';
import { RSI, BollingerBands, VWAP } from 'technicalindicators';
import getTimeScale from './getTimeScale';
import MainChart from './MainChart';
import RSIChart from './RSIChart';
import { MARGIN } from './variables';

const RSIPeriod = 14;
const splitOHLCVs = (ohlcvs) => {
  const res = {};
  res.open = [];
  res.high = [];
  res.low = [];
  res.close = [];
  res.volume = [];
  for (let i = 0; i < ohlcvs.length; i++) {
    res.open.push(ohlcvs[i].open);
    res.high.push(ohlcvs[i].high);
    res.low.push(ohlcvs[i].low);
    res.close.push(ohlcvs[i].close);
    res.volume.push(ohlcvs[i].volume);
  }
  return res;
};

const Chart = ({ history }) => {
  const [indicators, setIndicators] = useState();
  const [ref, { width }] = useMeasure();
  const timeScale = getTimeScale({ width: 1000, ohlcvs: history.prices });

  useEffect(() => {
    if (history.prices) {
      const indicators = {};
      const { open, high, low, close, volume } = splitOHLCVs(history.prices);

      const vwap = VWAP.calculate({ high, low, close, volume });
      const rsi = RSI.calculate({ values: close, period: RSIPeriod });
      indicators.rsi = history.prices
        .slice(RSIPeriod, history.prices.length)
        .map(({ time }, i) => ({ time, value: rsi[i] }));
      indicators.vwap = history.prices.map(({ time }, i) => ({ time, value: vwap[i] }));

      setIndicators(indicators);
    }
  }, [history.prices]);

  return (
    <Flex flexDir="column" w="10000px">
      <Heading fontSize="2xl" fontWeight="500" my="4">
        Lịch sử lệnh đặt
      </Heading>
      <Flex ref={ref} flexDir="column">
        <MainChart
          timeScale={timeScale}
          ohlcvs={history.prices}
          orders={history.orders}
          indicators={indicators}
          width={1000}
        />
        {indicators && indicators.rsi && <RSIChart timeScale={timeScale} rsi={indicators.rsi} width={1000} />}
        <Flex as="svg" h="32px">
          <AxisBottom top={0} left={0} scale={timeScale} tickFormat={(d) => dayjs(d * 1000).format('HH:mm DD/MM')} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Chart;
