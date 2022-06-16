// LAYOUT
import DefaultLayout from "../layout/default";
import {Container, Divider, Flex, Grid, Heading, Spinner, Text, useBoolean} from "@chakra-ui/react";
import Link from 'next/link'
import Contracts from "../contracts";
import {useCallback, useEffect, useState} from "react";
import {useMetaMaskWallet} from "../hooks/useWallet";
import RideHistoryCard from "../components/RideHistoryCard";

const History = () => {
    const [rides, setRides] = useState([])

    const [isLoading, setIsLoading] = useBoolean()

    const {connectWallet} = useMetaMaskWallet()

    const getRide = useCallback( async (id, account) => {
        setIsLoading.on();
        const Ride = Contracts.instances.Ride;

        const RideCaller = Ride?.methods?.getRide(id);

        const RideGas = await RideCaller?.estimateGas({
            from: account
        })

        const receipt = await RideCaller.call({
            from: account,
            gas: RideGas
        })
        let ride = {
            pickup: receipt.ride.pickup,
            destination: receipt.ride.destination,
            distance: receipt.ride.distance,
            price: receipt.ride.price,
        };
        let status = {
            isCancelled: receipt.status.isCancelled,
            isComplete: receipt.status.isComplete,
            isConfirmed: receipt.status.isConfirmed,
            wasCancelledBy: receipt.status.wasCancelledBy,
        }


        setRides([{
            ride,
            status,
            timestamp: receipt.timestamp
        }])
        setIsLoading.off();

    }, [])

    useEffect(() => {
        connectWallet()
            .then( (account) => {
                getRide(1, account)
            })

    }, [Contracts, getRide])

    if(isLoading){
        return <>
            <Flex
                flexDir={'column'}
                w={'100%'}
                h={'100vh'}
                justify={'center'}
                alignItems={'center'}
            >
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='brand.500'
                    size='xl'
                />
            </Flex>
        </>
    }

    return <>
        <Container maxW={'container.xl'} py={'2rem'}>
            <Flex w={'full'} alignItems={'center'} justify={'space-between'}>
                <Heading>
                    Ride History
                </Heading>
                <Text color={'brand.500'} fontWeight={700} fontSize={'lg'}>
                    <Link href={'/'}>Go back</Link>
                </Text>
            </Flex>
            <Divider borderColor={'brand.500'} my={'1rem'}/>
            <Grid
                gridTemplateColumns={{base: '1fr', lg: 'repeat(3, 1fr)'}}
                gap={'10px'}
            >
                {
                    rides.map((ride, index) =>
                        <RideHistoryCard
                            from={ride?.ride?.pickup}
                            to={ride?.ride?.destination}
                            distance={ride?.ride?.distance}
                            price={ride?.ride?.price}
                            timestamp={ride.timestamp}
                            isComplete={ride?.status?.isComplete}
                            isCancelled={ride?.status?.isCancelled}
                            isConfirmed={ride?.status?.isConfirmed}
                            key={index}
                        />
                    )
                }
            </Grid>
        </Container>
    </>
}

History.layout = DefaultLayout;

export default History