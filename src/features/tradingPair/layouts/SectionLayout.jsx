import { Flex } from '@chakra-ui/react';
import DCASection from '../sections/DCA';
import FundManagementSection from '../sections/FundManagement';
import StrategySection from '../sections/Strategy';
import AssetSection from '../sections/AssetSection';
import ProfitSection from '../sections/ProfitSection';

const InfoLayout = ({ tradingPair }) => {
  return (
    <>
      <Flex justify="center" my="4">
        <AssetSection tradingPair={tradingPair} />
        <ProfitSection tradingPair={tradingPair} />
      </Flex>
      <Flex justify="center" my="4">
        <FundManagementSection tradingPair={tradingPair} />
        <DCASection tradingPair={tradingPair} />
      </Flex>
      <Flex justify="center" my="4">
        <StrategySection tradingPair={tradingPair} />
      </Flex>
    </>
  );
};

export default InfoLayout;
