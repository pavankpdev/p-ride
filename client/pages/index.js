import { Box, Flex, Grid } from "@chakra-ui/react";
import dynamic from "next/dynamic";

// LAYOUT
import DefaultLayout from "../layout/default";

// COMPONENTS

// using nextjs dynamic import since window is undefined in next SSR
const MapComp = dynamic(() => import("../components/map"), { ssr: false });

const Home = () => {
  return (
    <>
      <Flex w={"100%"}>
        <Box d={{ base: "none", lg: "block" }} w={"25%"} as={"aside"}>
          
        </Box>
        <Box id="map" height={"100vh"} w={{ base: "100vw", lg: "75%" }}>
          <MapComp />
        </Box>
      </Flex>
    </>
  );
};

Home.layout = DefaultLayout;

export default Home;
