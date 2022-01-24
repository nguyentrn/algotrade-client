import { Flex, Heading, Icon, Image, Text, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RiGasStationFill } from 'react-icons/ri';

import { selectBalances } from '../../redux/accountSlice';
import getTokenAlphaColor from '../../utils/getTokenAlphaColor';
import Error from '../../components/Alert/Error';

const Wallet = () => {
  const balances = useSelector(selectBalances);

  return (
    <Flex w="100%" flexDir="column">
      <Flex flexDir="column" m="auto" mb="10" w="660px">
        <Heading fontSize="2xl">Ví Gas</Heading>
        <Flex bg="primaryAlpha.200" h="20" w="320px" p="4" align="center" borderRadius="xl" boxShadow="sm">
          <Flex h="12" w="12" mr="4" bg="primaryAlpha.700" align="center" justify="center" borderRadius="full">
            <Icon fontSize="3xl" color="white" as={RiGasStationFill} />
          </Flex>
          <Flex fontSize="lg" fontWeight="bold" flexDir="column">
            <Text>1000$</Text>
          </Flex>
        </Flex>
      </Flex>

      <Flex flexDir="column" m="auto" mb="10" w="660px">
        <Heading fontSize="2xl">Ví Binance</Heading>
        <Flex flexWrap="wrap" align="center" justify="space-around" w="660px" m="auto">
          {Object.values(balances).length ? (
            Object.values(balances).map((balance) => (
              <Flex
                key={balance.asset}
                bg={getTokenAlphaColor(balance.color)}
                h="20"
                w="320px"
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
            ))
          ) : (
            <Error title="Kết nối Sàn giao dịch thất bại" desc="Vui lòng kiểm tra API tại trang cá nhân" />
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
{
  /* <Text color="red.500" fontWeight="500" fontSize="xs">
  Kết nối Binance thất bại! Vui lòng nhập thông tin API tại trang thông tin!
</Text> */
}

export default Wallet;
