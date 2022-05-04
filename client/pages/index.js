import { Box, Flex, Grid } from "@chakra-ui/react";
import dynamic from "next/dynamic";

// LAYOUT
import DefaultLayout from "../layout/default";

// COMPONENTS
import BookRide from "../components/Dashboard/bookRidePanel";

// using nextjs dynamic import since window is undefined in next SSR
const MapComp = dynamic(() => import("../components/map"), { ssr: false });

const Home = () => {
  return (
    <>
      <Box pos={"relative"}>
      <MapComp />
      
        <Box
          pos={"absolute"}
          d={{ base: "none", lg: "block" }}
          w={"25%"}
          as={"aside"}
          top={"30px"}
          left={"30px"}
          zIndex={999}
          bg={"white"}
          pb={"2rem"}
          rounded={"lg"}
        >
          <BookRide />
        </Box>
      </Box>
    </>
  );
};

Home.layout = DefaultLayout;

export default Home;
