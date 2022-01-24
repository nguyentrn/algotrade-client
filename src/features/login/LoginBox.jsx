import { Flex, Text } from '@chakra-ui/react';
// import Box from '../../components/Box';
import useLocalization from '../../hooks/useLocalization';
// import useLogin from './hooks/useLogin';
// import LoginForm from './layouts/LoginForm';

const LoginBox = () => {
  // useLogin();
  const t = useLocalization('common');

  return (
    <Flex h="calc(100vh - 20rem)">
      <Text color="blackAlpha.900" fontSize="2xl" m="auto">
        {t('login-to-continue')}
      </Text>
    </Flex>
  );
};

export default LoginBox;
