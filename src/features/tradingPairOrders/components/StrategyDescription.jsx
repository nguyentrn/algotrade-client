import { Flex, Heading, UnorderedList, ListItem, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const createStrategyText = (strategy) => {
  const openConditions = [];
  openConditions.push(
    `Khi giá đang ở mức thấp nhất và có dấu hiệu hồi phục lại ${strategy.advanceSettings.callbackForMarginCall}%, bot sẽ vào vị thế khởi tạo`
  );
  if (strategy.isDCA) {
    openConditions.push(
      `Bot sẽ tiếp tục vào ${
        strategy.entryPoints.length
      } vị thế Trung bình giá tiếp theo nếu lệnh đầu tiên ở vị trí lần lượt là ${strategy.entryPoints
        .map((entryPoint) => `${entryPoint.position}% (vốn x${entryPoint.multiples})`)
        .join(', ')}  `
    );
  }
  const takeProfitConditions = [
    `Sau khi đạt mức lãi tối thiểu ${strategy.takeProfit}%, bot sẽ chờ đến khi giá đạt đỉnh và thị trường bắt đầu thoái lui ${strategy.advanceSettings.earningCallback}% (từ mức đỉnh)`,
  ];
  const stopLossConditions = [`Bot sẽ cắt lỗ khi lệnh khởi tạo thua lỗ ${strategy.stopLoss}%`];

  return [
    { list: openConditions, color: 'blue', section: 'open-position', label: 'Vào lệnh' },
    { list: takeProfitConditions, color: 'green', section: 'take-profit', label: 'Chốt lời' },
    { list: stopLossConditions, color: 'red', section: 'stop-loss', label: 'Cắt lỗ' },
  ];
};

const StrategyDescription = ({ strategy }) => {
  const [strategyText, setStrategyText] = useState();

  useEffect(() => {
    if (strategy) {
      setStrategyText(createStrategyText(strategy));
    }
  }, [strategy]);

  if (!strategyText) {
    return <Spinner />;
  }

  return (
    <Flex flexDir="column">
      <Heading fontSize="2xl" fontWeight="500" my="8">
        Mô tả {strategy.strategy}
      </Heading>
      <Flex justify="center">
        {strategyText.map(({ section, color, label, list }) => (
          <Flex
            key={section}
            bg={`${color}.100`}
            color={`${color}.900`}
            py="6"
            px="4"
            mx="1"
            w="80"
            borderRadius="xl"
            flexDir="column"
            align="center"
          >
            <Heading fontSize="xl">
              <strong>{label}</strong>
            </Heading>
            <UnorderedList>
              {list.map((item) => (
                <ListItem key={item}>{item}.</ListItem>
              ))}
            </UnorderedList>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default StrategyDescription;
