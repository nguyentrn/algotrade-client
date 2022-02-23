import { Flex, Text } from '@chakra-ui/react';

const DescriptionItem = ({ label, data, color }) => {
  return (
    <Flex flexDir="column" align="center" my={{ base: '2', lg: 'initial' }}>
      <Text fontSize="md" fontWeight="600" color={color}>
        {data}
      </Text>
      <Text fontSize="sm" color="blackAlpha.500">
        {label}
      </Text>
    </Flex>
  );
};

export default DescriptionItem;
