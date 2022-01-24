import { useDisclosure } from '@chakra-ui/react';
import useLocalization from '../../../../hooks/useLocalization';

import Settings from '../../components/Settings';
import ManagementForm from './FundManagementForm';

const ManagementSettings = ({ tradingPair }) => {
  const t = useLocalization('common');
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Settings
      title={t('fund-management-settings')}
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      isDisabled={tradingPair.isActive}
    >
      <ManagementForm symbol={tradingPair.symbol} tradingPair={tradingPair} onClose={onClose} />
    </Settings>
  );
};

export default ManagementSettings;
