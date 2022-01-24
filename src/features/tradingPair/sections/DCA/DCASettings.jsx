import { FormControl, FormLabel, useDisclosure } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

import Settings from '../../components/Settings';
import NumberInput from '../../../../components/NumberInput';
import DCAForm from './DCAForm';
import createEntryPointInputs from './createEntryPointInputs';

const DCASettings = ({ tradingPair }) => {
  const [entryPointInputs, setEntryPointInputs] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChangeNumberOfPosition = (val) => {
    setEntryPointInputs(createEntryPointInputs(tradingPair.entryPoints, val * 1));
  };

  useEffect(() => {
    setEntryPointInputs(createEntryPointInputs(tradingPair.entryPoints));
  }, [tradingPair.entryPoints]);

  return (
    <Settings
      title="Cài đặt Trung bình giá"
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      isDisabled={tradingPair.isActive}
    >
      <FormControl px="4" display="flex">
        <FormLabel w="100%" alignSelf="center">
          Số lần vào vị thế:
        </FormLabel>
        <NumberInput
          w="40"
          step={1}
          defaultValue={tradingPair.entryPoints.length}
          min={1}
          max={10}
          onChange={handleChangeNumberOfPosition}
          register={{ readOnly: true }}
        />
      </FormControl>
      <DCAForm
        symbol={tradingPair.symbol}
        entryPoints={tradingPair.entryPoints}
        entryPointInputs={entryPointInputs}
        onClose={onClose}
      />
    </Settings>
  );
};

export default DCASettings;
