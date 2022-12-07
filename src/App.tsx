import * as React from 'react';
import { ChakraProvider, theme, Flex } from '@chakra-ui/react';

import { Blunder } from './Blunder';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Flex
      direction='column'
      overflowX='auto'
      minH='100vh'
      w='full'
      maxW='100vw'
      bg={'#f9f9f9'}
    >
      <Blunder />
    </Flex>
  </ChakraProvider>
);
