import { Flex, Spinner } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';

import OHLCV from './model/OHLCV';
import { selectTradingPairs } from '../../redux/marketSlice';
import SymbolListTable from './SymbolListTable';

const DashboardLayout = () => {
  const market = useSelector(selectTradingPairs);
  const { isLoading, error, data } = useQuery('ohlcvs', () =>
    fetch(`${process.env.SERVER_HOSTNAME}/meta/ohlcvs`).then((res) => res.json())
  );

  const symbols = useMemo(() => {
    if (data) {
      return data.data.map(({ symbol, ohlcv }) => {
        const pair = market.find((s) => s.symbol === symbol);
        return { symbol, ohlcv: new OHLCV(ohlcv), id: pair.id };
      });
    }
  }, [data]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Flex flexDir="column" w="100%">
      <SymbolListTable symbols={symbols} />
    </Flex>
  );
};

export default DashboardLayout;
