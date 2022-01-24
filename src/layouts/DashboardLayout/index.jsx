import { Flex } from '@chakra-ui/react';

import SocketContext from '../../context/SocketContext.js';
import useAccountInfo from '../../hooks/useAccountInfo';
import useSocket from '../../hooks/useSocket';
import Breadcrumb from './Breadcrumb.jsx';
import Header from './Header';
import Sidebar from './Sidebar';

const DashboardLayout = (props) => {
  const socket = useSocket();
  useAccountInfo();
  return (
    <SocketContext.Provider value={socket}>
      <Flex w="100%" minH="100vh" bg="blackAlpha.100">
        <Sidebar />
        <Flex flexDir="column" w="100%" mr="4" boxShadow="lg" bg="whiteAlpha.900">
          <Header />
          {/* <Breadcrumb /> */}
          <Flex px="20" pb="20" pt="5" {...props} />
        </Flex>
      </Flex>
    </SocketContext.Provider>
  );
};

export default DashboardLayout;
