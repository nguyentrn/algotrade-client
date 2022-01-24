import { Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import Error from '../../components/Alert/Error';

import { selectTradingPairs } from '../../redux/marketSlice';
import TradingPair from './components/TradingPair';

const DashboardLayout = () => {
  const tradingPairs = useSelector(selectTradingPairs);
  return (
    <Flex flexDir="row" flexWrap="wrap" align="center" justify="space-around">
      <Error
        title="Kết nối Sàn giao dịch thất bại"
        desc={
          <Text>
            Vui lòng kiểm tra API tại <Link href="">trang cá nhân</Link>
          </Text>
        }
        my="4"
      />

      {tradingPairs.map((tradingPair) => (
        <TradingPair tradingPair={tradingPair} key={tradingPair.symbol} />
      ))}
    </Flex>
  );
};

export default DashboardLayout;
