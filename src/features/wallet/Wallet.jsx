import { Flex } from '@chakra-ui/react';

import ExchangeWallet from './ExchangeWallet';
import FuelWallet from './FuelWallet';

const Wallet = () => {
  return (
    <Flex w="100%" flexDir="column">
      <FuelWallet />
      <ExchangeWallet />
    </Flex>
  );
};

export default Wallet;
