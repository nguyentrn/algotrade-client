import { Flex } from '@chakra-ui/react';

export const SectionHeader = (props) => (
  <Flex
    justify="space-between"
    align="center"
    bg="primaryAlpha.100"
    p="2"
    pl="6"
    mb="4"
    borderRadius="lg"
    fontWeight="700"
    w="100%"
    h="12"
    {...props}
  />
);

const Section = (props) => <Flex flexDir="column" w="96" align="center" mx="2" {...props} />;

export default Section;
