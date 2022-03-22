import { Flex, Image, Table, Thead, Tbody, Tr, Th, Td, Text, Badge } from '@chakra-ui/react';
import { orderBy } from 'lodash';
import { useMemo } from 'react';
import useLocalization from '../../hooks/useLocalization';

const getRSIColor = (rsi) => {
  if (rsi >= 50) {
    return `green.${Math.round(rsi / 10)}00`;
  }
  if (rsi <= 50) {
    return `red.${10 - Math.round(rsi / 10)}00`;
  }
  return `gray.700`;
};

const SymbolListTable = ({ symbols }) => {
  const t = useLocalization('common');
  console.log(symbols);
  const symbolsByRSIDesc = useMemo(() => {
    if (symbols) {
      return orderBy(
        symbols.map(({ id, symbol, ohlcv }) => {
          const rsi = ohlcv.calculateRSI('5m', 14);
          const macd = ohlcv.calculateMACD('5m');
          const lastRSI = rsi[rsi.length - 1];
          const lastMACD = macd[macd.length - 1];

          return {
            symbol,
            rsi: lastRSI,
            macd: lastMACD.MACD,
            macdSignal: lastMACD.signal,
            obv: ohlcv.calculateOBV('5m'),
            id,
            time: ohlcv['5m'].time[ohlcv['5m'].time.length - 1],
            candlePatterns: ohlcv.getCandlePatterns('5m'),
          };
        }),
        'rsi',
        'desc'
      );
    }
  }, [symbols]);
  return (
    <Flex flexDir="column" w="100%">
      <Flex flexDir="column" mb="4" align="center">
        <Text fontWeight="600" as="h2" fontSize="lg" color="blackAlpha.800">
          Phân tích thị trường
        </Text>
        <Text fontWeight="600" fontSize="xs" color="blackAlpha.500">
          (timeframe: 5m; period: 14)
        </Text>
      </Flex>

      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Tên Coin</Th>
            <Th isNumeric>RSI</Th>
            <Th isNumeric>MACD</Th>
            <Th isNumeric>MACD Signal</Th>
            <Th>Mẫu nến</Th>
            <Th>Dự đoán</Th>
          </Tr>
        </Thead>
        <Tbody>
          {symbolsByRSIDesc.map((symbol) => (
            <Tr key={symbol.symbol}>
              <Td>
                <Flex align="center">
                  <Image
                    src={`https://s2.coinmarketcap.com/static/img/coins/128x128/${symbol.id}.png`}
                    w="32px"
                    mr="4"
                    alt={symbol.baseAsset}
                  />
                  <Text alignSelf="center" justifySelf="center">
                    {symbol.symbol}
                  </Text>
                </Flex>
              </Td>
              <Td
                fontWeight={symbol.rsi > 70 || symbol.rsi < 30 ? '700' : '500'}
                color={getRSIColor(symbol.rsi)}
                isNumeric
              >
                {symbol.rsi}
              </Td>
              <Td isNumeric>{symbol.macd.toFixed(5)}</Td>
              <Td isNumeric>{symbol.macdSignal.toFixed(5)}</Td>
              <Td>
                <Flex flexDir="column">
                  {symbol.candlePatterns.map((candlePattern) => (
                    <Badge
                      key={`${candlePattern.name}_${candlePattern.timeframe}`}
                      color={candlePattern.color}
                      alignSelf="flex-start"
                      mb="1"
                    >
                      {t(candlePattern.id)} ({candlePattern.name})_{candlePattern.timeframe} ({candlePattern.lastCandle}
                      )
                    </Badge>
                  ))}
                </Flex>
              </Td>
              <Td>
                <Text color="green.600" fontWeight="700">
                  Uptrend (101%)
                </Text>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  );
};

export default SymbolListTable;
