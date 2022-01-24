import React, { useEffect, useState } from 'react';
import { Flex, Heading, Text, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption } from '@chakra-ui/react';
import dayjs from 'dayjs';

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
          {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
          <Thead>
            <Tr>
              <Th pr="0">Thời gian</Th>
              <Th px="0">Loại lệnh</Th>
              <Th px="0" isNumeric>
                Lệnh thứ
              </Th>
              <Th px="0" isNumeric>
                Mức giá
              </Th>
              <Th px="0" isNumeric>
                Lượng mua
              </Th>
              <Th px="0" isNumeric>
                Giá trị
              </Th>
              <Th pl="0" isNumeric>
                Lợi nhuận
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders?.map((order) => (
              <Tr key={order.transactTime} bg={`${order.color}.100`} color={`${order.color}.900`}>
                <Td pr="0">{dayjs(order.transactTime * 1000).format('HH:mm DD/MM')}</Td>
                <Td px="0">{order.type}</Td>
                <Td px="0" isNumeric>
                  {order.position}
                </Td>
                <Td px="0" isNumeric>
                  {order.price}$
                </Td>
                <Td px="0" isNumeric>
                  {order.origQty}
                </Td>
                <Td px="0" isNumeric>
                  {order.amount?.toFixed(2)}$
                </Td>
                <Td pl="0" isNumeric>
                  {order.profit?.toFixed(2)}
                </Td>
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
