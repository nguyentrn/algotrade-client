import { Text, Heading } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import useLocalization from '../../../hooks/useLocalization';
import { selectTradingPairs } from '../../../redux/marketSlice';

const BacktestInfo = ({ backtest, change, entryPositions, info }) => {
  const tradingPairs = useSelector(selectTradingPairs);
  const t = useLocalization('common');
  return (
    <>
      <Heading fontSize="xl" fontWeight="500" my="4">
        Kết quả
      </Heading>
      <Text mb="4">
        Tổng vốn sử dụng: <strong>{(info.initialAmount * (1 + entryPositions)).toFixed(2)}$</strong>
      </Text>
      <Text mb="4">
        Giá trị {tradingPairs.find((pair) => pair.symbol === info.symbol).name} thay đổi từ:{' '}
        <strong>{backtest.ohlcvs[0][1]}$</strong> -> <strong>{backtest.ohlcvs[backtest.ohlcvs.length - 1][1]}$</strong>{' '}
        (
        <strong>
          {change > 0 ? 'Tăng' : 'Giảm'} {'  '}
          {(change * 100).toFixed(2)}%
        </strong>
        )
      </Text>
      <Text mb="4">
        Lợi nhuận của bot: <strong>{backtest.totalProfit.toFixed(2)}$</strong>
      </Text>
    </>
  );
};

export default BacktestInfo;
