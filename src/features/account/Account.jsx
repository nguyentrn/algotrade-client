import { Flex, Heading, FormControl, FormLabel, Input, Button, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import useLocalization from '../../hooks/useLocalization';
import { selectToken } from '../../redux/authSlice';
import { fetchAccount, selectPermissions } from '../../redux/accountSlice';
import sendRequest from '../../utils/sendRequest';

const Wallet = () => {
  const t = useLocalization('common');
  const [isLoading, toggleLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, toggleSuccess] = useState(false);
  const token = useSelector(selectToken);
  const permissions = useSelector(selectPermissions);
  const dispatch = useDispatch();
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
    if (res.data) {
      dispatch(fetchAccount());
      toggleSuccess(true);
      setError(null);
    } else {
      setError('API Key không hợp lệ');
      console.log(res);
    }
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
            defaultValue={permissions ? '**********************************' : ''}
            {...register('api_key', { required: 'Please enter your api_key.' })}
          />
        </FormControl>
        <FormControl my="2">
          <FormLabel htmlFor="secret_key">Secret Key</FormLabel>
          <Input
            id="secret_key"
            defaultValue={permissions ? '**********************************' : ''}
            {...register('secret_key', { required: 'Please enter your secret_key.' })}
          />
        </FormControl>
        {(error || isSuccess) && (
          <Text my="2" alignSelf="center" fontSize="xs" fontWeight="600" color={error ? 'red.500' : 'green.500'}>
            {error ? error : 'Quý khách đã nhập API thành công'}
          </Text>
        )}
        <Button alignSelf="center" type="submit" isLoading={isLoading}>
          {t('submit')}
        </Button>
      </Flex>
    </Flex>
  );
};

export default Wallet;
