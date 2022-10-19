import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { SidebarProvider } from '../contexts/SidebarContext';

import type { AppProps } from 'next/app'

import theme from '../theme'


function MyApp({ Component, pageProps }: AppProps) {
  return (

    <ChakraProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <SidebarProvider>
        <Component {...pageProps} />
      </SidebarProvider>
    </ChakraProvider>
  );
}

export default MyApp
