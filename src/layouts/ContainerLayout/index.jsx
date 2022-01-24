import { Flex, Text } from '@chakra-ui/react';
import LoginBox from '../../features/login/LoginBox';
import useLocalization from '../../hooks/useLocalization';

import Header from '../DashboardLayout/Header';

const ContainerLayout = () => {
  const t = useLocalization('common');
  return (
    <Flex flexDir="column" minH="100vh">
      <Header />
      <LoginBox />
    </Flex>
  );
};

export default ContainerLayout;
