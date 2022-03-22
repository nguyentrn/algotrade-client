import { Flex } from '@chakra-ui/react';

import SocketContext from '../../context/SocketContext.js';
import useSocket from '../../hooks/useSocket';
import Background from './Background.jsx';
import Breadcrumb from './Breadcrumb';
import Error from './Error';
import Header from './Header';
import Sidebar from './Sidebar';

const DashboardLayout = (props) => {
  const socket = useSocket();
  return (
    <SocketContext.Provider value={socket}>
      <Flex
        w="100%"
        minH="100vh"
        flexDir={{ base: 'column-reverse', lg: 'row' }}
        pb={{ base: '1rem', lg: 'initial' }}
        bg="blackAlpha.100"
        pos="relative"
      >
        <Sidebar />
        <Flex flexDir="column" mr={{ base: '0', lg: '4' }} boxShadow="lg" bg="whiteAlpha.900" flexGrow="1">
          {/* <Background /> */}
          <Breadcrumb />
          <Header />
          <Error />
          <Flex px={{ base: '5px', lg: '20px' }} pb="20" pt="5" {...props}>
            {props.children}
          </Flex>
        </Flex>
      </Flex>
    </SocketContext.Provider>
  );
};

export default DashboardLayout;
