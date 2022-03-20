import { Flex, Heading, Icon, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RiGasStationFill } from 'react-icons/ri';

import { selectFuel } from '../../redux/accountSlice';

const FuelWallet = () => {
  const fuel = useSelector(selectFuel);

  return (
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
  );
};

export default FuelWallet;
