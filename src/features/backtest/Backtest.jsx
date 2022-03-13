import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Flex } from '@chakra-ui/react';

import BacktestForm from './layouts/BacktestForm';
import BacktestResult from './layouts/BacktestResult';
import sendRequest from '../../utils/sendRequest';
import formatOrders from '../../utils/formatOrders';
import { selectToken } from '../../redux/authSlice';

const Backtest = () => {
  const [info, setInfo] = useState();
  const [entryPositions, setEntryPositions] = useState();
  const [backtest, setBacktest] = useState();
  const [change, setChange] = useState();
  const [loading, toggleLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useSelector(selectToken);

  const fetchData = async (data) => {
    toggleLoading(true);
    setError(null);
    const res = await sendRequest({ method: 'post', pathname: 'backtest', data, token });
    if (res && res.data) {
      setBacktest({ ...res.data, orders: formatOrders(res.data.orders) });
      const first = res.data.ohlcvs[0];
      const last = res.data.ohlcvs[res.data.ohlcvs.length - 1];
      const entryPoints = data.entryPoints.map(({ multiples }) => multiples);
      const entryPosition = data.isDCA && entryPoints.length ? entryPoints.reduce((s, v) => s + v) : 0;
      setInfo(data);
      setEntryPositions(entryPosition);
      setChange((last[1] - first[1]) / first[1]);
    } else {
      setError('Tài khoản gas của quý khách không đủ để thực hiện backtest!');
    }

    toggleLoading(false);
  };

  return (
    <Flex w="100%" flexDir="column">
      <BacktestForm fetchData={fetchData} />
      <BacktestResult
        loading={loading}
        error={error}
        backtest={backtest}
        change={change}
        info={info}
        entryPositions={entryPositions}
      />
    </Flex>
  );
};

export default Backtest;
