import { Flex, keyframes } from '@chakra-ui/react';
import colors from '../../theme/colors';

const slide = keyframes`
  from { transform: translateX(-25%); }
  to { transform: translateX(25%); }
`;

const bg = {
  animation: `${slide} 3s ease-in-out infinite alternate`,
  backgroundImage: `linear-gradient(-60deg, ${colors.primaryAlpha[200]} 50%, ${colors.primaryAlpha[50]} 50%)`,
  bottom: 0,
  left: '-50%',
  opacity: '0.5',
  position: 'fixed',
  right: '-50%',
  top: 0,
  zIndex: -1,
};

const Background = () => {
  return (
    <Flex w="10rem" h="10rem" pos="relative" top="0" left="0">
      {/* <Flex {...bg}></Flex> */}
      {/* <Flex {...bg}></Flex> */}
      {/* <Flex {...bg}></Flex> */}
      {/* <div className="bg bg2"></div>
      <div className="bg bg3"></div> */}
    </Flex>
  );
};

export default Background;
