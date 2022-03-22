import { Flex, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import useLocalization from '../../../hooks/useLocalization';
import getTokenAlphaColor from '../../../utils/getTokenAlphaColor';

const TradingPair = ({ tradingPair }) => {
  const [percent24h, setPercent24h] = useState();
  const t = useLocalization('common');

  useEffect(() => {
    setPercent24h(Math.round(((tradingPair.c - tradingPair.o) * 10000) / tradingPair.o) / 100);
  }, [tradingPair.c, tradingPair.o]);

  const bg = useMemo(() => getTokenAlphaColor(tradingPair.color, 1, 0.05), [tradingPair.color]);

  return (
    <Link href={`/trading-pair/${tradingPair.symbol}`} passHref>
      <Flex
        cursor="pointer"
        bg={bg}
        mx={{ base: '0', sm: '8' }}
        my={{ base: '1', lg: '2' }}
        px={{ base: '4', lg: '6' }}
        py={{ base: '2', lg: '4' }}
        // px="6"
        w={{ base: '100%', sm: '96' }}
        border="1px"
        align="center"
        borderColor="gray.200"
        borderRadius="md"
        pos="relative"
        color="blackAlpha.900"
      >
        <Stat>
          <StatLabel>
            <Flex align="center" mb="2">
              <Image
                src={`https://s2.coinmarketcap.com/static/img/coins/128x128/${tradingPair.id}.png`}
                w="32px"
                mr="4"
                alt={tradingPair.baseAsset}
              />
              <Text fontWeight="600">
                {tradingPair.baseAsset}/{tradingPair.quoteAsset}
              </Text>
            </Flex>
          </StatLabel>
          <StatNumber fontSize="lg">{tradingPair.c ? tradingPair.c : t('loading')}</StatNumber>

          {!tradingPair.c && (
            <StatHelpText fontSize="xs" color="yellow.600">
              {t('loading')}
            </StatHelpText>
          )}
          {tradingPair.c && (
            <StatHelpText fontSize="xs" color={percent24h > 0 ? 'green.600' : 'red.600'}>
              <StatArrow type={percent24h > 0 ? 'increase' : 'decrease'} />
              {percent24h}%
            </StatHelpText>
          )}
        </Stat>
        <Badge variant="subtle" colorScheme={tradingPair.isActive ? 'green' : 'orange'} px="2" py="1" borderRadius="md">
          {tradingPair.isActive ? 'Đang chạy' : 'Chưa kích hoạt'}
        </Badge>
      </Flex>
    </Link>
  );
};

export default TradingPair;
