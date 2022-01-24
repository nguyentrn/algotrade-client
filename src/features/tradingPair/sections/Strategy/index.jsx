import { Tbody, Tr, Td, Table, Text } from '@chakra-ui/react';

import Section, { SectionHeader } from '../../components/Section';
import useLocalization from '../../../../hooks/useLocalization';
import StrategySettings from './StrategySettings';

const StrategySection = ({ tradingPair }) => {
  const t = useLocalization('common');

  return (
    <Section>
      <SectionHeader>
        <Text w="100%">{t('advanced-strategy')}</Text>
        <StrategySettings tradingPair={tradingPair} />
      </SectionHeader>

      <Table w="80">
        <Tbody>
          {Object.entries(tradingPair.advanceSettings).map(([key, val]) => (
            <Tr key={key}>
              <Td fontSize="xs">{t(key)}</Td>
              <Td isNumeric fontWeight="600">
                {val}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Section>
  );
};

export default StrategySection;
