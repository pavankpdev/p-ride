import {NextPage} from "next";
import NavBar from "components/navbar";
import {
    Avatar,
    Button,
    Container,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    Heading,
    Input,
    Link,
    Text,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import {useContext, useEffect, useState} from "react";
import {IRideRequest, LocationContext} from "context/Location";
import {useRouter} from "next/router";

// HOOKS
import useSocket from "hooks/useSocket";

// using nextjs dynamic import since window is undefined in next SSR
const MapComp = dynamic(() => import("components/map"), { ssr: false });

const RideDetails: NextPage = () => {

    const [otp, setOtp] = useState(0)
    const [ride, setRide] = useState<IRideRequest | null>(null)
    const [isRideStarted, setIsRideStarted] = useState(false);

    const {getRideDetails, passRide} = useContext(LocationContext)
    const router = useRouter();
    const {socket} = useSocket();

    const handleOtpChange = (e: any) => {
        if(e.target.value.length > 4){
            return
        }
        setOtp(e.target.value)
    }

    useEffect(() => {
        const details = getRideDetails(router.query?.id as string)
        setRide(details)
    }, [router])

    useEffect(() => {
        socket.on('RIDE_CANCELLED', () => {
            alert('This ride has been cancelled by the user.')
            passRide(router.query?.id as string)
            router.push('/')
        })

        return () => {
            socket.off('RIDE_CANCELLED', () => {
                alert('This ride has been cancelled by the user.')
                passRide(router.query?.id as string)
                router.push('/')
            })
        }
    }, [socket])

    const startRide = () => {
        if(otp == ride?.otp){
            setIsRideStarted(true)
            return
        }

        return alert('Invalid OTP')
    }

    return (
        <>
            <NavBar />
            <Container maxW={'container.xl'} py={'2rem'}>
                <Grid h={'80vh'} gridTemplateColumns={{base: '1fr', lg: '30% 70%'}} bg={'white'} boxShadow={'lg'} rounded={'lg'}>
                    <Flex flexDir={'column'} gap={'1.5rem'} w={'100%'} p={'1rem'} >
                        <Heading as={'h1'} size={'lg'}>Ride Details</Heading>

                        <Flex w={'100%'} gap={'5px'} alignItems={'center'}>
                            <Avatar name={'Pavan'} size={'sm'} />
                            <Heading as={'h3'} size={'md'} noOfLines={1}>{ride?.fullname}</Heading>
                        </Flex>

                        <Flex gap={'10px'} alignItems={'center'}>
                            <Input value={ride?.phno} w={'60%'} readOnly variant={'filled'} cursor={'not-allowed'} />
                            <Link href={`tel:+91${ride?.phno}`} color={'brand.500'}> Call Customer </Link>
                        </Flex>

                        <Flex flexDir={'column'} gap={'10px'} bg={'gray.100'} p={'1rem'} rounded={'lg'}>
                            <Heading as={'h3'} size={'md'}>Pickup location</Heading>
                            <Text>
                                {ride?.from?.formatted_address}
                            </Text>
                        </Flex>

                        <Flex flexDir={'column'} gap={'10px'} bg={'gray.100'} p={'1rem'} rounded={'lg'}>
                            <Heading as={'h3'} size={'md'}>Drop location</Heading>
                            <Text>
                                {ride?.to?.formatted_address}
                            </Text>
                        </Flex>

                        {
                            !isRideStarted &&  <FormControl>
                                <FormLabel htmlFor='otp'>OTP</FormLabel>
                                <Input id='otp' type='text' placeholder={'0000'} value={otp} onChange={handleOtpChange} />
                            </FormControl>
                        }

                        {
                            !isRideStarted
                            ? <Button colorScheme={'brand'} disabled={!otp} onClick={startRide}>
                                    Start Ride
                              </Button>
                            : <Button colorScheme={'brand'} disabled={!otp} onClick={startRide}>
                                    Complete Ride
                              </Button>

                        }
                    </Flex>
                    <MapComp isRideStarted={isRideStarted} />

                </Grid>
            </Container>
        </>
    );
}

export default RideDetails;