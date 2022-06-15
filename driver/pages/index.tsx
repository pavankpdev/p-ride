import type { NextPage } from 'next'
import {Container, Divider, Grid, Heading} from "@chakra-ui/react";
import {useContext} from "react";

// COMPONENTS
import NavBar from "components/navbar";
import RideRequestCard from "components/RideRequestCard";

// CONTEXT
import {LocationContext} from "context/Location";

const Home: NextPage = () => {

  const {rideQueue} = useContext(LocationContext)

  return (
    <div>
      <NavBar />
      <Container maxW={'container.xl'} py={'2rem'}>
          <Heading>
              Ride Request Queue
          </Heading>
          <Divider borderColor={'brand.500'} mt={'.5rem'} />
         <Grid gridTemplateColumns={{base: '1fr', lg: 'repeat(3, 1fr)'}} gap={'10px'} mt={'1rem'}>
             {
                 rideQueue.map((ride, index) => <RideRequestCard {...ride} key={index} />)
             }
         </Grid>
      </Container>
    </div>
  )
}

export default Home
