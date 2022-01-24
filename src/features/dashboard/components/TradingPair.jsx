import { Flex, Stat, StatLabel, StatNumber, StatHelpText, StatArrow } from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Dialog from './Dialog';

const TradingPair = ({ tradingPair }) => {
  const [percent24h, setPercent24h] = useState();
  useEffect(() => {
    setPercent24h(Math.round(((tradingPair.c - tradingPair.o) * 10000) / tradingPair.o) / 100);
  }, [tradingPair.c, tradingPair.o]);

  return (
    <Link href={`/trading-pair/${tradingPair.symbol}`} passHref>
      <Flex
        cursor="pointer"
        mx="8"
        my="2"
        px="6"
        py="4"
        w="96"
        border="1px"
        align="center"
        borderColor="gray.200"
        borderRadius="sm"
      >
        <Stat>
          <StatLabel>
            {tradingPair.baseAsset}/{tradingPair.quoteAsset}
          </StatLabel>
          <StatNumber fontSize="lg">{tradingPair.c}</StatNumber>
          <StatHelpText fontSize="xs" color={percent24h > 0 ? 'green.600' : 'red.600'}>
            <StatArrow type={percent24h > 0 ? 'increase' : 'decrease'} />
            {percent24h}%
          </StatHelpText>
        </Stat>
        <Dialog tradingPair={tradingPair} />
      </Flex>
    </Link>
  );
};

export default TradingPair;
