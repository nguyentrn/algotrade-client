import React, { useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import dayjs from 'dayjs';
import colors from '../../theme/colors.js';
import { Heading } from '@chakra-ui/react';

const Chart = ({ backtest }) => {
  const upColor = colors.red[300];
  const upBorderColor = colors.red[700];
  const downColor = colors.green[300];
  const downBorderColor = colors.green[700];

  function calculateMA(dayCount) {
    var result = [];
    for (var i = 0, len = backtest.ohlcvs.length; i < len; i++) {
      if (i < dayCount) {
        result.push('-');
        continue;
      }
      var sum = 0;
      for (var j = 0; j < dayCount; j++) {
        sum += +backtest.ohlcvs[i - j][1];
      }
      result.push(sum / dayCount);
    }
    return result;
  }

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    legend: {
      data: ['Nến', 'MA20', 'MA50', 'MA200'],
    },
    grid: {
      left: '4%',
      right: '4%',
      bottom: '4%',
    },
    xAxis: {
      type: 'category',
      data: backtest.time,
      scale: true,
      boundaryGap: false,
      axisLine: { onZero: false },
      splitLine: { show: false },
      min: 'dataMin',
      max: 'dataMax',
      axisLabel: {
        formatter: (time) => dayjs(time * 1).format('HH:MM DD/MM'),
      },
    },
    yAxis: {
      scale: true,
      splitArea: {
        show: true,
      },
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 100,
      },
      {
        show: true,
        type: 'slider',
        top: '90%',
        start: 0,
        end: 100,
      },
    ],
    series: [
      {
        name: 'Nến',
        type: 'candlestick',
        data: backtest.ohlcvs,
        itemStyle: {
          color: upColor,
          color0: downColor,
          borderColor: upBorderColor,
          borderColor0: downBorderColor,
        },
        markPoint: {
          label: {
            formatter: function (param) {
              return param != null ? Math.round(param.value) + '' : '';
            },
          },
          data: backtest.orders.map((order) => ({
            name: 'Mark',
            coord: [(order.transactTime * 1000).toString(), order.price],
            value: order.price,
            itemStyle: {
              color: colors[order.color][300],
            },
          })),
          tooltip: {
            formatter: function (param) {
              return param.name + '<br>' + (param.data.coord || '');
            },
          },
        },
        markLine: {
          symbol: ['none', 'none'],
          data: [
            {
              name: 'min line on close',
              type: 'min',
              valueDim: 'close',
            },
            {
              name: 'max line on close',
              type: 'max',
              valueDim: 'close',
            },
          ],
        },
      },
      {
        name: 'MA20',
        type: 'line',
        data: calculateMA(20),
        smooth: true,
        lineStyle: {
          opacity: 0.5,
        },
      },
      {
        name: 'MA50',
        type: 'line',
        data: calculateMA(50),
        smooth: true,
        lineStyle: {
          opacity: 0.5,
        },
      },
      {
        name: 'MA200',
        type: 'line',
        data: calculateMA(200),
        smooth: true,
        lineStyle: {
          opacity: 0.5,
        },
      },
    ],
  };

  const instance = useRef(null);

  return (
    <>
      <Heading fontSize="xl" fontWeight="500" my="4">
        Biểu đồ lệnh đặt
      </Heading>

      <ReactECharts ref={instance} option={option} style={{ height: 500, width: '100%' }} />
    </>
  );
};

export default Chart;
