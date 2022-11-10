import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { SidebarProvider } from '../contexts/SidebarContext';

import type { AppProps } from 'next/app';

import Favicon from '../components/Favicon';
import theme from '../theme';


function MyApp({ Component, pageProps }: AppProps) {
  return (

    <ChakraProvider>
      <Favicon />
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <SidebarProvider>
        <Component {...pageProps} />
      </SidebarProvider>
    </ChakraProvider>
  );
}

export default MyApp
