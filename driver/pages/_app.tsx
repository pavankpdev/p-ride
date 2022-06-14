import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from "next/head";
import {ChakraProvider} from "@chakra-ui/provider";

// THEME
import PRideTheme from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <title>P-Ride - Driver platform</title>
      <meta
          name="description"
          content="A decentralized peer to peer ridesharing system"
      />
      <link rel="icon" href="/icon.png" type="image/png" />
    </Head>

    <ChakraProvider theme={PRideTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  </>
}

export default MyApp
