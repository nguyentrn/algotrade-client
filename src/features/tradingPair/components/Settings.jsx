import SettingsButton from './SettingsButton';
import SettingsModal from './SettingsModal';

const Settings = (props) => {
  return (
    <>
      <SettingsButton onOpen={props.onOpen} isDisabled={props.isDisabled} />
      <SettingsModal isOpen={props.isOpen} onClose={props.onClose} {...props} />
    </>
  );
};

export default Settings;
