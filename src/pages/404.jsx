import { Flex, Text } from '@chakra-ui/react';

import App from '../layouts/App';

const Home = () => {
  return (
    <App>
      <Flex w="100%" justify="center" align="center">
        <Text fontSize="8xl" fontWeight="200" borderRight="1px" pr="4" mr="4">
          404
        </Text>
        <Text fontSize="3xl" fontWeight="300">
          Không tìm thấy trang
        </Text>
      </Flex>
    </App>
  );
};

export default Home;
