import { Box, Container } from "@chakra-ui/react";
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
          w={"30%"}
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

        <Box
          pos={"absolute"}
          d={{ lg: "none" }}
          w={"100%"}
          as={"aside"}
          bottom={0}
          zIndex={999}
          bg={"white"}
          pb={"2rem"}
          rounded={"lg"}
        >
          <Container>
              <BookRide />
          </Container>
        </Box>
      </Box>
    </>
  );
};

Home.layout = DefaultLayout;

export default Home;
