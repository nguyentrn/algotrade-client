import { Flex, Spinner } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useLocalization from '../../hooks/useLocalization';
import { fetchHistory, setHistory, selectHistory } from '../../redux/marketSlice';
import OrdersChart from './../../components/OrdersChart';
import OrdersDetail from './components/OrdersDetail';
import StrategyDescription from './components/StrategyDescription';

const TradingPairOrders = ({ symbol }) => {
  const t = useLocalization('common');
  const dispatch = useDispatch();
  const history = useSelector(selectHistory);
  const { tradingPairs } = useSelector((state) => state.market);

  useEffect(() => {
    dispatch(fetchHistory(symbol));
    return () => {
      dispatch(setHistory(undefined));
    };
  }, [dispatch, symbol]);

  if (!history) {
    return (
      <Flex w="100%" h="100%">
        <Spinner m="auto" size="xl" colorScheme="primaryAlpha.900" />
      </Flex>
    );
  }

  return (
    <Flex flexDir="column" flexWrap="wrap" justify="space-around" w="100%">
      <StrategyDescription history={history} strategy={tradingPairs[symbol]} />
      <OrdersChart history={history} />
      <OrdersDetail orders={history.orders} />
    </Flex>
  );
};

export default TradingPairOrders;
