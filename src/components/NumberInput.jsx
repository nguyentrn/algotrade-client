/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  NumberInput as CNumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';

const NumberInput = (props) => {
  return (
    <CNumberInput my="1" {...props}>
      <NumberInputField {...props.register} />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </CNumberInput>
  );
};

export default NumberInput;
