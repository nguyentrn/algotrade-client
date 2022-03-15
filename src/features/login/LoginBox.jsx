import { Flex, Text, Button } from '@chakra-ui/react';
// import Box from '../../components/Box';
import useLocalization from '../../hooks/useLocalization';
// import useLogin from './hooks/useLogin';
// import LoginForm from './layouts/LoginForm';
import { signIn, useSession } from 'next-auth/react';

const LoginBox = () => {
  const t = useLocalization('common');

  const { data: session } = useSession();

  const handleSignIn = () => {
    signIn('google');
  };

  return (
    <Flex
      mt="-10vh"
      w={{ base: '100%', lg: '28rem' }}
      h={{ base: '100%', lg: '18rem' }}
      borderRadius="xl"
      boxShadow="lg"
      bg="white"
      justify="center"
      align="center"
      flexDir="column"
      zIndex="1"
    >
      {!session && (
        <Button size="lg" colorScheme="primary" onClick={handleSignIn}>
          {t('sign-in')}
        </Button>
      )}

      <Text color="blackAlpha.700" fontWeight="500" fontSize="lg" mt="4">
        {t('login-to-continue')}!
      </Text>
    </Flex>
  );
};

export default LoginBox;
