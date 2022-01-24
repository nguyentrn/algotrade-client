import { Tbody, Tr, Td, Table, Text, Flex } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import Section, { SectionHeader } from '../components/Section';
import useLocalization from '../../../hooks/useLocalization';
import { selectBalances, selectOrders } from '../../../redux/accountSlice';
import { useMemo } from 'react';
import getHold from '../utils/getHold';

const AssetSection = ({ tradingPair }) => {
  const t = useLocalization('common');
  const balances = useSelector(selectBalances);
  const orders = useSelector(selectOrders);
  const balance = balances?.[tradingPair.baseAsset];
  const hold = useMemo(() => getHold(orders), [orders]);
  return (
    <Section>
      <SectionHeader>
        <Text>Lượng nắm giữ</Text>
        <Flex fontSize="xs" flexDir="column" align="center">
          <Text>
            {hold} {balance?.asset}
          </Text>
          <Text fontWeight="normal">~{(hold * tradingPair.c).toFixed(2) * 1} USDT</Text>
        </Flex>
      </SectionHeader>
      <Table w="80">
        <Tbody>
          <Tr>
            <Td fontSize="xs">Số lệnh đang triển khai</Td>
            <Td isNumeric fontWeight="600">
              {orders ? orders.length : 0}
            </Td>
          </Tr>
          <Tr>
            <Td fontSize="xs">Lượng nắm giữ của bot</Td>
            <Td isNumeric fontWeight="600">
              {hold}
              {balance?.asset}
            </Td>
          </Tr>
          <Tr>
            <Td fontSize="xs">Tổng lượng nắm giữ</Td>
            <Td isNumeric fontWeight="600">
              {balance?.free * 1}
              {balance?.asset}
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Section>
  );
};

export default AssetSection;
