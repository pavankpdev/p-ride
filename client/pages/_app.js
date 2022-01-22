import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";

// THEME
import PRideTheme from "../theme";

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
      <ChakraProvider theme={PRideTheme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
