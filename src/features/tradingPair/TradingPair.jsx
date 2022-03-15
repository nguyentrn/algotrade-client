import { Button, Flex, Spinner, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useLocalization from '../../hooks/useLocalization';
import useAPIError from '../../hooks/useAPIError';
import { getOrders } from '../../redux/accountSlice';
import { updateStrategy } from '../../redux/marketSlice';
import Description from './layouts/Description';
import SectionLayout from './layouts/SectionLayout';

const TradingPairLayout = ({ symbol }) => {
  const [tradingPair, setTradingPair] = useState();
  const dispatch = useDispatch();
  const error = useAPIError();
  const { tradingPairs } = useSelector((state) => state.market);
  const t = useLocalization('common');
  const handleActive = () => {
    const { symbol, isActive, initialAmount, takeProfit, stopLoss, isDCA, entryPoints, advanceSettings, strategy } =
      tradingPair;
    dispatch(
      updateStrategy({
        symbol,
        isActive: !isActive,
        initialAmount,
        takeProfit,
        stopLoss,
        isDCA,
        entryPoints,
        advanceSettings,
        strategy,
      })
    );
  };

  useEffect(() => {
    if (tradingPairs[symbol]) {
      setTradingPair(tradingPairs[symbol]);
    }
  }, [symbol, tradingPairs]);

  useEffect(() => {
    dispatch(getOrders(symbol));
  }, [dispatch, symbol]);

  if (!tradingPair) {
    return (
      <Flex h="100%">
        <Spinner m="auto" size="xl" colorScheme="primaryAlpha.900" />
      </Flex>
    );
  }

  return (
    <Flex flexDir="column" flexWrap="wrap" justify="space-around" w="100%">
      <Text as="h2" fontSize="lg" fontWeight="600">
        {tradingPair.baseAsset} / {tradingPair.quoteAsset}
      </Text>

      <Description tradingPair={tradingPair} />
      <SectionLayout tradingPair={tradingPair} />
      <Button
        alignSelf="center"
        px="10"
        mt="5"
        onClick={handleActive}
        colorScheme={tradingPair.isActive ? 'orange' : 'primary'}
        // isDisabled={error}
      >
        {tradingPair.isActive ? t('stop') : t('start')}
      </Button>
    </Flex>
  );
};

export default TradingPairLayout;
