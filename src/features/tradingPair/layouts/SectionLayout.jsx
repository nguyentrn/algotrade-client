import { Flex } from '@chakra-ui/react';
import DCASection from '../sections/DCA';
import FundManagementSection from '../sections/FundManagement';
import StrategySection from '../sections/Strategy';
import AssetSection from '../sections/AssetSection';
import ProfitSection from '../sections/ProfitSection';

const InfoLayout = ({ tradingPair }) => {
  return (
    <Flex flexDir="column" w={{ base: '100%', md: '750px' }} mx="auto">
      <Flex
        justify="space-between"
        align={{ base: 'center', md: 'initial' }}
        flexDir={{ base: 'column', md: 'row' }}
        my="4"
      >
        <AssetSection tradingPair={tradingPair} />
        <ProfitSection tradingPair={tradingPair} />
      </Flex>
      <Flex
        justify="space-between"
        align={{ base: 'center', md: 'initial' }}
        flexDir={{ base: 'column', md: 'row' }}
        my="4"
      >
        <FundManagementSection tradingPair={tradingPair} />
        <DCASection tradingPair={tradingPair} />
      </Flex>
      <Flex justify="center" align={{ base: 'center', md: 'initial' }} flexDir={{ base: 'column', md: 'row' }} my="4">
        <StrategySection tradingPair={tradingPair} />
      </Flex>
    </Flex>
  );
};

export default InfoLayout;
