import { Tbody, Tr, Td, Table, Text } from '@chakra-ui/react';

import Section, { SectionHeader } from '../../components/Section';
import useLocalization from '../../../../hooks/useLocalization';
import FundManagementSettings from './FundManagementSettings';
import { fundManagementProps } from '../../../../constant/tradingPairDetail';

const FundManagementSection = ({ tradingPair }) => {
  const t = useLocalization('common');

  return (
    <Section>
      <SectionHeader>
        <Text w="100%">{t('fund-management')}</Text>
        <FundManagementSettings tradingPair={tradingPair} />
      </SectionHeader>
      <Table w="80">
        <Tbody>
          {fundManagementProps.map(({ prop, unit }) => (
            <Tr key={prop}>
              <Td fontSize="xs">{t(prop)}</Td>
              <Td isNumeric fontWeight="600">
                {tradingPair[prop]}
                {unit}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Section>
  );
};

export default FundManagementSection;
