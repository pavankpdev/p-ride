import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";

// CONTEXT
import { LocationContextProvider } from "../context/location";
import {RideContextProvider} from "../context/ride";

// THEME
import PRideTheme from "../theme";

// STYLES
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css"

function MyApp({ Component, pageProps }) {
  const Layout = Component.layout || (({ children }) => <>{children}</>);

  return (
    <>
      <Head>
        <title>P-Ride - A decentralized peer to peer ridesharing system</title>
        <meta
          name="description"
          content="A decentralized peer to peer ridesharing system"
        />
        <link rel="icon" href="/icon.png" type="image/png" />
      </Head>
      <LocationContextProvider>
          <RideContextProvider>
            <ChakraProvider theme={PRideTheme}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ChakraProvider>
          </RideContextProvider>
      </LocationContextProvider>
    </>
  );
}

export default MyApp;
