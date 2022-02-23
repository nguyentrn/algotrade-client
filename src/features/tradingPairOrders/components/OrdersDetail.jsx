import React, { useEffect, useState } from 'react';
import { Flex, Heading, Table, Thead, Tbody, Tfoot, Tr, Th, Td } from '@chakra-ui/react';
import dayjs from 'dayjs';

const headers = [
  {
    label: 'Thời gian',
    isNumeric: false,
  },
  {
    label: 'Loại lệnh',
    isNumeric: false,
  },
  {
    label: 'Lệnh thứ',
    isNumeric: true,
  },
  {
    label: 'Mức giá',
    isNumeric: true,
  },
  {
    label: 'Lượng mua',
    isNumeric: true,
  },
  {
    label: 'Giá trị',
    isNumeric: true,
  },
  {
    label: 'Lợi nhuận',
    isNumeric: true,
  },
];

const StyledTd = (props) => <Td fontSize={{ base: '10', sm: 'xs', md: 'sm' }} px="0.5" {...props} />;

const OrdersDetail = ({ orders }) => {
  const [profit, setProfit] = useState();
  useEffect(() => {
    if (orders) {
      const profits = orders.map((order) => order.profit).filter((o) => o);
      if (profits.length) {
        setProfit(profits.reduce((s, v) => s + v).toFixed(2));
      }
    }
  }, [orders.length]);

  return (
    <Flex flexDir="column">
      <Heading fontSize="xl" fontWeight="500" my="4">
        Chi tiết lệnh đặt
      </Heading>

      <Flex flexDir="column">
        <Table>
          <Thead>
            <Tr>
              {headers.map((header) => (
                <Th
                  px="0.5"
                  fontSize={{ base: '12', sm: 'initial', sm: 'xs', md: 'sm' }}
                  key={header.label}
                  isNumeric={header.isNumeric}
                >
                  {header.label}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {orders?.map((order) => (
              <Tr key={order.transactTime} bg={`${order.color}.100`} color={`${order.color}.900`}>
                <StyledTd>{dayjs(order.transactTime * 1000).format('HH:mm DD/MM')}</StyledTd>
                <StyledTd>{order.type}</StyledTd>
                <StyledTd isNumeric>{order.position}</StyledTd>
                <StyledTd isNumeric>{order.price}$</StyledTd>
                <StyledTd isNumeric>{order.origQty?.toFixed(6)}$</StyledTd>
                <StyledTd isNumeric>{order.amount?.toFixed(2)}$</StyledTd>
                <StyledTd isNumeric>{order.profit ? `${order.profit?.toFixed(2)}$` : ''}</StyledTd>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr fontWeight="700">
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td isNumeric color={`${profit >= 0 ? 'green' : 'red'}.600`}>
                {profit || 0}
              </Td>
            </Tr>
          </Tfoot>
        </Table>
      </Flex>
    </Flex>
  );
};

export default OrdersDetail;
