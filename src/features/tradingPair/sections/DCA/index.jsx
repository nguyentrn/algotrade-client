import { Tbody, Tr, Td, Table, Thead, Th, Switch, Text, Flex } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

import Section, { SectionHeader } from '../../components/Section';
import useLocalization from '../../../../hooks/useLocalization';
import { updateStrategy } from '../../../../redux/marketSlice';
import DCASettings from './DCASettings';

const DCASection = ({ tradingPair }) => {
  const t = useLocalization('common');
  const dispatch = useDispatch();

  const handleToggleDCA = () => {
    dispatch(updateStrategy({ symbol: tradingPair.symbol, isDCA: !tradingPair.isDCA }));
  };

  return (
    <Section>
      <SectionHeader>
        <Text w="100%">{t('dca')}</Text>
        <Flex align="center" fontWeight="500" fontSize="xs">
          <Text mr="2">{tradingPair.isDCA ? 'Bật' : 'Tắt'}</Text>
          <Switch
            id="isDCA"
            isChecked={tradingPair.isDCA}
            onChange={handleToggleDCA}
            isDisabled={tradingPair.isActive}
          />
        </Flex>
        <DCASettings tradingPair={tradingPair} />
      </SectionHeader>
      {tradingPair.isDCA ? (
        <Table w="80" size="sm" fontSize="xs">
          <Thead>
            <Tr>
              <Th color="blackAlpha.500">{t('entryPoint')}</Th>
              <Th color="blackAlpha.500" isNumeric>
                Vốn
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {tradingPair.entryPoints.map(({ position, multiples }, id) => (
              <Tr key={id} border="none">
                <Td border="none" fontWeight="600">
                  {position}%
                </Td>
                <Td border="none" isNumeric fontWeight="600">
                  {multiples}x
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <Text w="80" fontSize="xs">
          Quý khách sẽ vào vị thế một lần duy nhất trong mỗi phiên chạy của bot
        </Text>
      )}
    </Section>
  );
};

export default DCASection;
