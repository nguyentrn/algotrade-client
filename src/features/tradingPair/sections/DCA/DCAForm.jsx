import { Text, Flex, Button } from '@chakra-ui/react';
import { useForm, FormProvider } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { updateStrategy } from '../../../../redux/marketSlice';
import DCAInput from './DCAInput';

const DCAForm = ({ symbol, entryPointInputs, onClose }) => {
  const dispatch = useDispatch();
  const methods = useForm({
    shouldUnregister: true,
  });

  const onSubmit = async (data) => {
    dispatch(updateStrategy({ symbol, entryPoints: data.entryPoints }));
    onClose();
  };

  return (
    <FormProvider {...methods}>
      <Flex as="form" flexDir="column" onSubmit={methods.handleSubmit(onSubmit)} px="8" py="4">
        <Flex
          borderBottom="1px"
          borderColor="blackAlpha.200"
          color="blackAlpha.500"
          fontWeight="600"
          fontSize="xs"
          py="1"
        >
          <Text w="100%">Lệnh thứ</Text>
          <Text w="40" textAlign="center">
            Vị thế
          </Text>
          <Text w="40" textAlign="center">
            Vốn
          </Text>
        </Flex>
        <Flex flexDir="column" mt="2">
          {entryPointInputs?.map((entryPointInput, id) => (
            <DCAInput key={id} entryPointInput={entryPointInput} id={id} />
          ))}
        </Flex>
        <Button type="submit" m="auto" mt="4" px="10">
          Lưu
        </Button>
      </Flex>
    </FormProvider>
  );
};

export default DCAForm;
