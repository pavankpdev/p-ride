import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from "next/head";
import {ChakraProvider} from "@chakra-ui/provider";

// THEME
import PRideTheme from "../theme";

// CONTEXT
import {LocationContextProvider} from "context/Location";
import {DriverContextProvider} from "context/driver";

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
    <DriverContextProvider>
      <LocationContextProvider>
            <ChakraProvider theme={PRideTheme}>
              <Component {...pageProps} />
            </ChakraProvider>
      </LocationContextProvider>
    </DriverContextProvider>
  </>
}

export default MyApp
