import { Text, Flex } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import NumberInput from '../../../../components/NumberInput';

const DCAInput = ({ entryPointInput, id }) => {
  const { register } = useFormContext();

  return (
    <Flex justify="space-between" align="center">
      <Text fontSize="sm">Lệnh số {id + 1}</Text>
      <Flex>
        <NumberInput
          w="24"
          size="sm"
          min={-80}
          max={500}
          precision={2}
          pattern=".*"
          keepWithinRange={false}
          defaultValue={entryPointInput.position}
          register={{ ...register(`entryPoints.${id}.position`, { valueAsNumber: true }) }}
        />
        <NumberInput
          w="24"
          size="sm"
          min={0}
          precision={2}
          pattern=".*"
          keepWithinRange={false}
          defaultValue={entryPointInput.multiples}
          register={{ ...register(`entryPoints.${id}.multiples`, { valueAsNumber: true }) }}
        />
      </Flex>
    </Flex>
  );
};

export default DCAInput;
