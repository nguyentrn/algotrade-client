import { IconButton } from '@chakra-ui/react';
import { FiSettings } from 'react-icons/fi';

const SettingsButton = ({ onOpen, isDisabled }) => {
  return (
    <IconButton
      onClick={onOpen}
      variant="outline"
      border="none"
      ml="4"
      fontSize="2xl"
      colorScheme="blue"
      aria-label="DCA Settings"
      icon={<FiSettings />}
      isDisabled={isDisabled}
    />
  );
};

export default SettingsButton;
