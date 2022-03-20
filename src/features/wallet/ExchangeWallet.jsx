import { Flex, Heading, Image, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import { selectBalances } from '../../redux/accountSlice';
import getTokenAlphaColor from '../../utils/getTokenAlphaColor';

const ExchangeWallet = () => {
  const balances = useSelector(selectBalances);

  return (
    <Flex flexDir="column" m="auto" mb="10" w={{ base: '100%', sm: '620px' }}>
      <Heading fontSize="2xl">Ví Binance</Heading>
      <Flex flexWrap="wrap" align="center" justify="space-around" w={{ base: '100%', sm: '620px' }} m="auto">
        {Object.values(balances).length ? (
          Object.values(balances).map(
            (balance) =>
              balance.free * 1 !== 0 && (
                <Flex
                  key={balance.asset}
                  bg={getTokenAlphaColor(balance.color)}
                  h="20"
                  w="300px"
                  m="5px"
                  p="4"
                  align="center"
                  borderRadius="xl"
                  boxShadow="sm"
                >
                  <Image h="12" mr="4" src={`images/coins/${balance.asset}.png`} alt={`${balance.asset}-logo`} />
                  <Flex fontSize="lg" fontWeight="semibold" flexDir="column">
                    <Text>
                      {Math.round(balance.free * 10000 + balance.locked * 10000) / 10000} {balance.asset}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      Free: {Math.round(balance.free * 10000) / 10000}. Locked:{' '}
                      {Math.round(balance.locked * 10000) / 10000}
                    </Text>
                  </Flex>
                </Flex>
              )
          )
        ) : (
          <Text color="gray.500" fontWeight="500" fontSize="xs">
            Không tìm thấy coin trong ví!
          </Text>
        )}
      </Flex>
    </Flex>
  );
};

export default ExchangeWallet;
