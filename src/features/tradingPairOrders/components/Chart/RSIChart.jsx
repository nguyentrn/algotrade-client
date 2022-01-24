import React from 'react';
import { Flex } from '@chakra-ui/react';
import { LinePath } from '@visx/shape';
import { scaleLinear } from '@visx/scale';
import { Group } from '@visx/group';
import { AxisRight } from '@visx/axis';
import { LinearGradient } from '@visx/gradient';
import { Grid } from '@visx/grid';

import colors from '../../../../theme/colors';
import { MARGIN } from './variables';
import { min, max } from 'd3-array';

const getDate = (d) => d.time;
const getValue = (d) => d.value;

const RSIChart = ({ rsi, timeScale, width }) => {
  const yScale = scaleLinear({
    domain: [min(rsi, getValue), max(rsi, getValue)],
  });
  yScale.range([80, 0]);

  return (
    <Flex as="svg" h="85px">
      <Group top={5} left={0}>
        <Grid
          xScale={timeScale}
          yScale={yScale}
          width={width - MARGIN}
          height={80}
          numTicksRows={4}
          numTicksColumns={0}
        />
        <LinearGradient id="GradientRedGreen" from={colors.red[600]} to={colors.green[600]} />
        <LinePath
          strokeWidth={2}
          data={rsi}
          x={(d) => timeScale(getDate(d))}
          y={(d) => yScale(getValue(d))}
          stroke={`url(#GradientRedGreen)`}
        />

        <AxisRight numTicks={6} hideZero scale={yScale} left={width - MARGIN} />
      </Group>
    </Flex>
  );
};

export default RSIChart;
