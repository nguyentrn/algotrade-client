import { Flex, Heading, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import useLocalization from '../../hooks/useLocalization';
import { selectIsApiEnabled } from '../../redux/accountSlice';
import { selectToken } from '../../redux/authSlice';
import sendRequest from '../../utils/sendRequest';

const Wallet = () => {
  const t = useLocalization('common');
  const [isLoading, toggleLoading] = useState(false);
  const token = useSelector(selectToken);
  const isAPIEnabled = useSelector(selectIsApiEnabled);
  const { register, handleSubmit } = useForm({ shouldUseNativeValidation: true });

  const onSubmit = async (data) => {
    toggleLoading(true);
    data.exchange = 'binance';
    const res = await sendRequest({
      method: 'post',
      pathname: 'account/updatetoken',
      data,
      token,
    });
    console.log(res);
    toggleLoading(false);
  };

  return (
    <Flex w="100%" maxW="600px" m="auto" flexDir="column">
      <Heading fontSize="lg" fontWeight="600">
        API Key
      </Heading>
      <Flex as="form" flexDir="column" onSubmit={handleSubmit(onSubmit)}>
        <FormControl my="2">
          <FormLabel htmlFor="api_key">API Key</FormLabel>
          <Input
            id="api_key"
            defaultValue={isAPIEnabled ? '**********************************' : ''}
            {...register('api_key', { required: 'Please enter your api_key.' })}
          />
        </FormControl>
        <FormControl my="2">
          <FormLabel htmlFor="secret_key">Secret Key</FormLabel>
          <Input
            id="secret_key"
            defaultValue={isAPIEnabled ? '**********************************' : ''}
            {...register('secret_key', { required: 'Please enter your secret_key.' })}
          />
        </FormControl>
        <Button alignSelf="center" type="submit" isLoading={isLoading}>
          {t('submit')}
        </Button>
      </Flex>
    </Flex>
  );
};

export default Wallet;
