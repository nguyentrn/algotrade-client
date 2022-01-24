import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

import styles from './styles';
import colors from './colors';
import icons from './icons';
import components from './components';

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
});

const theme = extendTheme({
  colors,
  fonts,
  breakpoints,
  styles,
  icons,
  components,
});

export default theme;
