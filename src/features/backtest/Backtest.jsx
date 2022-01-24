import { Flex, Heading, Icon, Image, Spinner, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import Chart from '../../components/Chart';
import sendRequest from '../../utils/sendRequest';
import BacktestForm from './components/BacktestForm';
import OrdersDetail from '../tradingPairOrders/components/OrdersDetail';
import formatOrders from '../../utils/formatOrders';
import BacktestInfo from './components/BacktestInfo';

const Backtest = () => {
  const [info, setInfo] = useState();
  const [entryPositions, setEntryPositions] = useState();
  const [backtest, setBacktest] = useState();
  const [change, setChange] = useState();
  const [loading, toggleLoading] = useState(true);

  const fetchData = async (data) => {
    toggleLoading(true);
    const res = await sendRequest({ method: 'post', pathname: 'backtest', data });
    setBacktest({ ...res.data, orders: formatOrders(res.data.orders) });
    const first = res.data.ohlcvs[0];
    const last = res.data.ohlcvs[res.data.ohlcvs.length - 1];
    const entryPoints = data.entryPoints.map(({ multiples }) => multiples);
    const entryPosition = data.isDCA && entryPoints.length ? entryPoints.reduce((s, v) => s + v) : 0;
    setInfo(data);
    setEntryPositions(entryPosition);
    setChange((last[1] - first[1]) / first[1]);
    toggleLoading(false);
  };

  return (
    <Flex w="100%" flexDir="column">
      <BacktestForm fetchData={fetchData} />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <BacktestInfo backtest={backtest} change={change} info={info} entryPositions={entryPositions} />
          <Chart backtest={backtest} />
          <OrdersDetail orders={backtest.orders} />
        </>
      )}
    </Flex>
  );
};

export default Backtest;
