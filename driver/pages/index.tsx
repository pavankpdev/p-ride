import type { NextPage } from 'next'
import {Avatar, Box, Button, Container, Divider, Flex, Grid, Heading, Text} from "@chakra-ui/react";
import {BsArrowDownCircle} from 'react-icons/bs'

// COMPONENTS
import NavBar from "components/navbar";
import RideRequestCard from "components/RideRequestCard";

const Home: NextPage = () => {
  return (
    <div>
      <NavBar />
      <Container maxW={'container.xl'} py={'2rem'}>
          <Heading>
              Ride Request Queue
          </Heading>
          <Divider borderColor={'brand.500'} mt={'.5rem'} />
         <Grid gridTemplateColumns={{base: '1fr', lg: 'repeat(3, 1fr)'}} gap={'10px'} mt={'1rem'}>
            <RideRequestCard pickup={'Kasavanahalli'} drop={'Dayananda Sagar Collge of Engineering'} user={'Pavan'} distance={20} />
            <RideRequestCard pickup={'Kasavanahalli'} drop={'Dayananda Sagar Collge of Engineering'} user={'Pavan'} distance={20} />
            <RideRequestCard pickup={'Kasavanahalli'} drop={'Dayananda Sagar Collge of Engineering'} user={'Pavan'} distance={20} />
            <RideRequestCard pickup={'Kasavanahalli'} drop={'Dayananda Sagar Collge of Engineering'} user={'Pavan'} distance={20} />
            <RideRequestCard pickup={'Kasavanahalli'} drop={'Dayananda Sagar Collge of Engineering'} user={'Pavan'} distance={20} />
            <RideRequestCard pickup={'Kasavanahalli'} drop={'Dayananda Sagar Collge of Engineering'} user={'Pavan'} distance={20} />
            <RideRequestCard pickup={'Kasavanahalli'} drop={'Dayananda Sagar Collge of Engineering'} user={'Pavan'} distance={20} />
            <RideRequestCard pickup={'Kasavanahalli'} drop={'Dayananda Sagar Collge of Engineering'} user={'Pavan'} distance={20} />
            <RideRequestCard pickup={'Kasavanahalli'} drop={'Dayananda Sagar Collge of Engineering'} user={'Pavan'} distance={20} />
            <RideRequestCard pickup={'Kasavanahalli'} drop={'Dayananda Sagar Collge of Engineering'} user={'Pavan'} distance={20} />
            <RideRequestCard pickup={'Kasavanahalli'} drop={'Dayananda Sagar Collge of Engineering'} user={'Pavan'} distance={20} />
            <RideRequestCard pickup={'Kasavanahalli'} drop={'Dayananda Sagar Collge of Engineering'} user={'Pavan'} distance={20} />
            <RideRequestCard pickup={'Kasavanahalli'} drop={'Dayananda Sagar Collge of Engineering'} user={'Pavan'} distance={20} />
            <RideRequestCard pickup={'Kasavanahalli'} drop={'Dayananda Sagar Collge of Engineering'} user={'Pavan'} distance={20} />
         </Grid>
      </Container>
    </div>
  )
}

export default Home
