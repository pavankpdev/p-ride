import {
    Avatar, Box,
    Button,
    Container,
    Flex,
    Grid,
    Heading,
    Input,
    Link,
    Text,
    useToast
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import {useRouter} from "next/router";

// LAYOUT
import DefaultLayout from "../layout/default";

// CONTEXT
import {RideContext} from "../context/ride";
import {useContext, useEffect} from "react";
import {LocationContext} from "../context/location";

// HOOKS
import useSocket from "../hooks/useSocket";
import Contracts from "../contracts";
import {useMetaMaskWallet} from "../hooks/useWallet";
import {ethers} from "ethers";

// using nextjs dynamic import since window is undefined in next SSR
const MapComp = dynamic(() => import("../components/map"), { ssr: false });

const Ride = () => {

    const {rideDetails, cancelRide} = useContext(RideContext)
    const { pickUpLocation, dropLocation } = useContext(LocationContext)
    const {connectWallet} = useMetaMaskWallet()

    const toast = useToast();
    const router = useRouter();
    const {socket} = useSocket();

    useEffect(() => {
        socket.on('RIDE_END', async () => {
            const account = await connectWallet();
            const PriToken = Contracts.instances.PriToken;

            // convert to Wei
            const price = ethers.utils.parseEther(`${rideDetails?.price}`)
            console.log(price)

            const TokenCaller = PriToken?.methods?.transfer(rideDetails?.driver?.address, price);

            const TokenGas = await TokenCaller?.estimateGas({
                from: account
            })

            const txn = await TokenCaller.send({
                from: account,
                gas: TokenGas
            })

            router.push('/complete')
        })

        return () => {
            socket.off('RIDE_END', () => {
                router.push('/complete')
            })
        }
    }, [socket])

    const handleCancelRide = () => {
        cancelRide();
        toast({
            title: 'Ride Cancelled',
            status: 'info',
            isClosable: true,
            position: 'top'
        })
        setTimeout(() => {
            router.push('/')
        }, 1500)
    }

    return <>
        <Container maxW={'container.xl'} py={'2rem'}>
            <Grid h={'80vh'} gridTemplateColumns={{base: '1fr', lg: '30% 70%'}} bg={'white'} boxShadow={'lg'} rounded={'lg'} >
                <Flex flexDir={'column'} gap={'1.5rem'} w={'100%'} p={'1rem'} >
                    <Heading as={'h1'} size={'lg'}>Ride Details</Heading>

                    <Flex w={'100%'} gap={'5px'} alignItems={'center'}>
                        <Avatar name={rideDetails?.driver?.fullname} size={'sm'} />
                        <Heading as={'h3'} size={'md'} noOfLines={1}>{rideDetails?.driver?.fullname}</Heading>
                    </Flex>

                    <Flex gap={'10px'} alignItems={'center'}>
                        <Input value={rideDetails?.driver?.phno} w={'60%'} readOnly variant={'filled'} cursor={'not-allowed'} />
                        <Link href={`tel:+91${rideDetails?.driver?.phno}`} color={'brand.500'}> Call Driver </Link>
                    </Flex>

                    <Flex flexDir={'column'} gap={'10px'} bg={'gray.100'} p={'1rem'} rounded={'lg'}>
                        <Heading as={'h3'} size={'md'}>Pickup location</Heading>
                        <Text>
                            {pickUpLocation?.formattedAddress}
                        </Text>
                    </Flex>

                    <Flex flexDir={'column'} gap={'10px'} bg={'gray.100'} p={'1rem'} rounded={'lg'}>
                        <Heading as={'h3'} size={'md'}>Drop location</Heading>
                        <Text>
                            {dropLocation?.formattedAddress}
                        </Text>
                    </Flex>

                    <Box bg={'blue.500'} color={'white'} w={'fit-content'} p={'1rem'} rounded={'lg'}>
                        <Text fontWeight={700}>OTP: {rideDetails?.otp}</Text>
                    </Box>

                    <Button colorScheme={'brand'} onClick={handleCancelRide}>
                        Cancel Ride
                    </Button>

                </Flex>
                <MapComp h={'100%'} w={'100%'} />

            </Grid>
        </Container>
    </>
}

Ride.layout = DefaultLayout;

export default Ride;