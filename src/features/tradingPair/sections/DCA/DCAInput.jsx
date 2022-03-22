/* eslint-disable react/no-children-prop */
import { Text, Flex, InputGroup, InputLeftAddon, InputRightAddon } from '@chakra-ui/react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import NumberInput from '../../../../components/NumberInput';

const formatPosition = (val) => val + '%';
const formatMultiples = (val) => '×' + val;
const parsePosition = (val) => val.replace(/\%$/, '');
const parseMultiples = (val) => val.replace(/^×/, '');

const DCAInput = ({ entryPointInput, id }) => {
  const { register } = useFormContext();
  const [position, setPosition] = useState(entryPointInput.position);
  const [multiples, setMultiples] = useState(entryPointInput.multiples);

  return (
    <Flex justify="space-between" align="center">
      <Text fontSize="sm">Lệnh số {id + 1}</Text>
      <Flex>
        <NumberInput
          onChange={(v) => setPosition(parsePosition(v))}
          value={formatPosition(position)}
          w="20"
          size="sm"
          min={-99}
          max={500}
          pattern=".*"
          keepWithinRange={false}
          register={{
            ...register(`entryPoints.${id}.position`, {
              setValueAs: (v) => parsePosition(v),
            }),
          }}
        />
        <NumberInput
          onChange={(v) => setMultiples(parseMultiples(v))}
          value={formatMultiples(multiples)}
          ml="2"
          w="20"
          size="sm"
          min={0}
          pattern=".*"
          keepWithinRange={false}
          // register={{ ...register(`entryPoints.${id}.multiples`, { setValueAs: (v) => parseMultiples(v) }) }}
          register={{
            ...register(`entryPoints.${id}.multiples`, {
              setValueAs: (v) => parseMultiples(v),
            }),
          }}
        />
      </Flex>
    </Flex>
  );
};

export default DCAInput;
