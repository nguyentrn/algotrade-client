import { useDisclosure } from '@chakra-ui/react';
import useLocalization from '../../../../hooks/useLocalization';

import Settings from '../../components/Settings';
import StrategyForm from './StrategyForm';

const StrategySettings = ({ tradingPair }) => {
  const t = useLocalization('common');
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Settings
      title={t('advanced-strategy-settings')}
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      isDisabled={tradingPair.isActive}
    >
      <StrategyForm tradingPair={tradingPair} onClose={onClose} />
    </Settings>
  );
};

export default StrategySettings;
