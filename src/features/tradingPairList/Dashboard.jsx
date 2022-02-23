import { Flex } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import { selectTradingPairs } from '../../redux/marketSlice';
import TradingPair from './components/TradingPair';

const TradingPairList = () => {
  const tradingPairs = useSelector(selectTradingPairs);
  return (
    <Flex flexDir="row" flexWrap="wrap" align="center" justify="space-evenly">
      {tradingPairs.map((tradingPair) => (
        <TradingPair tradingPair={tradingPair} key={tradingPair.symbol} />
      ))}
    </Flex>
  );
};

export default TradingPairList;
