import { Flex, Heading, Icon, Image, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RiGasStationFill } from 'react-icons/ri';

import { selectBalances, selectFuel } from '../../redux/accountSlice';
import getTokenAlphaColor from '../../utils/getTokenAlphaColor';

const Wallet = () => {
  const balances = useSelector(selectBalances);
  const fuel = useSelector(selectFuel);

  return (
    <Flex w="100%" flexDir="column">
      <Flex flexDir="column" m="auto" mb="10" w={{ base: '100%', sm: '620px' }}>
        <Heading fontSize="2xl">Ví Gas</Heading>
        <Flex m="auto" bg="primaryAlpha.200" h="20" w="300px" p="4" align="center" borderRadius="xl" boxShadow="sm">
          <Flex h="12" w="12" mr="4" bg="primaryAlpha.700" align="center" justify="center" borderRadius="full">
            <Icon fontSize="3xl" color="white" as={RiGasStationFill} />
          </Flex>
          <Flex fontSize="lg" fontWeight="bold" flexDir="column">
            <Text>{fuel?.toFixed(2)}$</Text>
          </Flex>
        </Flex>
      </Flex>

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
    </Flex>
  );
};

export default Wallet;
