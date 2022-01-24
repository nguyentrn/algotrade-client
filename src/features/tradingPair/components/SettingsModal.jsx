import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';
import useLocalization from '../../../hooks/useLocalization';

const SettingsModal = (props) => {
  const t = useLocalization('common');
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} maxH="40vh">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{props.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{props.children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SettingsModal;
