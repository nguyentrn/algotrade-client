import { Flex, Text } from '@chakra-ui/react';
import LoginBox from '../../features/login/LoginBox';
import useLocalization from '../../hooks/useLocalization';

import Header from '../DashboardLayout/Header';

const ContainerLayout = () => {
  const t = useLocalization('common');
  return (
    <Flex flexDir="column" h="100vh" justify="center" align="center" pos="relative">
      {/* <Header /> */}
      <Flex
        pos="absolute"
        top="0"
        left="0"
        right="0"
        bg="linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/background.jpeg')"
        bgSize="cover"
        bgPos="center center"
        w="100%"
        h="100%"
      />
      <LoginBox />
    </Flex>
  );
};

export default ContainerLayout;
