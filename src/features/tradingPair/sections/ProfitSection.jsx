import { Tbody, Tr, Td, Table, Text, Flex } from '@chakra-ui/react';

import Section, { SectionHeader } from '../components/Section';
import useLocalization from '../../../hooks/useLocalization';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectOrders } from '../../../redux/accountSlice';
import getHold from '../utils/getHold';
import getDCAPrices from '../utils/getDCAPrices';

const ProfitSection = ({ tradingPair }) => {
  const [profit, setProfit] = useState(0);
  const t = useLocalization('common');
  const orders = useSelector(selectOrders);
  const dcaPrice = useMemo(() => getDCAPrices(orders), [orders]);
  const hold = useMemo(() => getHold(orders), [orders]);

  useEffect(() => {
    setProfit((tradingPair.c - dcaPrice) / dcaPrice, [tradingPair.c, dcaPrice]);
  }, [tradingPair.c, dcaPrice]);

  return (
    <Section>
      <SectionHeader>
        <Text>{t('profit')}</Text>
        <Flex fontSize="xs" flexDir="column" align="center">
          <Text color={profit > 0 ? 'green' : 'red'}>
            {profit > 0 ? '+' : ''}
            {(hold * profit * dcaPrice).toFixed(2)} USDT
          </Text>
          <Text fontWeight="normal">
            {profit > 0 ? '+' : ''}
            {Math.round(profit * 10000) / 100}%
          </Text>
        </Flex>
      </SectionHeader>

      <Table w="80">
        <Tbody>
          <Tr>
            <Td fontSize="xs">Giá hiện tại</Td>
            <Td isNumeric fontWeight="600">
              {tradingPair.c} USDT
            </Td>
          </Tr>

          <Tr>
            <Td fontSize="xs">Trung bình giá mua</Td>
            <Td isNumeric fontWeight="600">
              {dcaPrice} USDT
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Section>
  );
};

export default ProfitSection;
