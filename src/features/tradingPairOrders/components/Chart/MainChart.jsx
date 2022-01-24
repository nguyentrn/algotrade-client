import React from 'react';
import { Flex } from '@chakra-ui/react';
import { LinePath } from '@visx/shape';
import { scaleLinear } from '@visx/scale';
import { Annotation, CircleSubject } from '@visx/annotation';
import { Group } from '@visx/group';
import { AxisBottom, AxisRight } from '@visx/axis';

import colors from '../../../../theme/colors';
import { min, max } from 'd3-array';
import { Grid } from '@visx/grid';
import { MARGIN } from './variables';

const getDate = (d) => d.time;
const getClose = (d) => d.close;
const getValue = (d) => d.value;

const MainChart = ({ width, timeScale, orders, ohlcvs, indicators }) => {
  const yScale = scaleLinear({
    domain: [min(ohlcvs, getClose) / 1.0003, max(ohlcvs, getClose) * 1.0003],
  });
  yScale.range([300, 0]);
  return (
    <Flex as="svg" height="300px">
      <Group top={0} left={0}>
        <Grid xScale={timeScale} yScale={yScale} width={width} height={300} numTicksRows={4} numTicksColumns={4} />
        <LinePath
          strokeWidth={2}
          data={ohlcvs}
          // data={ohlcvs.filter((_, i) => i % 10 === 0)}
          x={(d) => timeScale(getDate(d))}
          y={(d) => yScale(getClose(d))}
          stroke="#333"
        />
        <LinePath
          strokeWidth={2}
          data={indicators?.vwap}
          // data={indicators?.vwap.filter((_, i) => i % 10 === 0)}
          x={(d) => timeScale(getDate(d))}
          y={(d) => yScale(getValue(d))}
          stroke={colors.green[500]}
        />
        <AxisRight numTicks={6} hideZero scale={yScale} left={width - MARGIN} />
        <AxisBottom top={300} scale={timeScale} />

        {orders?.map((order) => (
          <Annotation key={order.transactTime}>
            <CircleSubject
              y={yScale(order.price)}
              x={timeScale(order.transactTime)}
              radius={8}
              strokeWidth="3"
              stroke={colors[order.color][500]}
              fill={`${colors[order.color][100]}66`}
            />
          </Annotation>
        ))}
      </Group>
    </Flex>
  );
};

export default MainChart;
