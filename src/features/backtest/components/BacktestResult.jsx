import { Spinner, Text } from '@chakra-ui/react';
import React from 'react';

import Chart from '../../../components/Chart';
import OrdersDetail from '../../tradingPairOrders/components/OrdersDetail';
import BacktestInfo from './BacktestInfo';

const BacktestResult = ({ loading, error, backtest, change, info, entryPositions }) => {
  if (loading) {
    return <Spinner m="auto" />;
  }
  if (error) {
    return (
      <Text m="auto" fontSize="sm" color="red.500">
        {error}
      </Text>
    );
  }

  if (backtest) {
    return (
      <>
        <BacktestInfo backtest={backtest} change={change} info={info} entryPositions={entryPositions} />
        <Chart backtest={backtest} />
        <OrdersDetail orders={backtest.orders} />
      </>
    );
  }
  return '';
};

export default BacktestResult;
