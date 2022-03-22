import React, { useRef, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import dayjs from 'dayjs';
import colors from '../../theme/colors.js';
import { Heading } from '@chakra-ui/react';

const ProfitChart = ({ profitByTime, time }) => {
  const profits = useMemo(
    () => [
      [time[0] / 1000, 0],
      ...profitByTime.map(({ profit, time }) => [time, profit]),
      [time[time.length - 1] / 1000, profitByTime[profitByTime.length - 1]?.profit],
    ],
    [profitByTime]
  );

  const option = {
    tooltip: {},
    xAxis: {
      type: 'time',
      axisLabel: {
        formatter: (time) => dayjs(time * 1000).format('HH:MM DD/MM'),
      },
      axisPointer: {
        snap: true,
        label: {
          show: true,
          formatter: (data) => dayjs(data.value * 1000).format('HH:MM DD/MM'),
        },
        handle: {
          show: true,
        },
      },
    },
    yAxis: {},
    series: [
      {
        name: 'Nến',
        type: 'line',
        data: profits,
      },
    ],
  };

  const instance = useRef(null);

  return (
    <>
      <Heading fontSize="xl" fontWeight="500" my="4">
        Biểu đồ lợi nhuận
      </Heading>
      <ReactECharts option={option} style={{ height: 400 }} ref={instance} />;
      {/* <ReactECharts ref={instance} option={option} style={{ height: 500, width: '100%' }} /> */}
    </>
  );
};

export default ProfitChart;
