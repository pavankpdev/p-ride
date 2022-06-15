import {NextPage} from "next";
import NavBar from "components/navbar";
import {Avatar, Button, Container, Flex, FormControl, FormLabel, Grid, Heading, Input, Link, Text} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import {useState} from "react";

// using nextjs dynamic import since window is undefined in next SSR
const MapComp = dynamic(() => import("components/map"), { ssr: false });


const Details: NextPage = () => {

    const [otp, setOtp] = useState(0)

    const handleOtpChange = (e: any) => {
        if(e.target.value.length > 4){
            return
        }
        setOtp(e.target.value)
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
                            <Heading as={'h3'} size={'md'} noOfLines={1}>Pavan</Heading>
                        </Flex>

                        <Flex gap={'10px'} alignItems={'center'}>
                            <Input value={'98989 98989'} w={'60%'} readOnly variant={'filled'} cursor={'not-allowed'} />
                            <Link href={'tel:+919880010215'} color={'brand.500'}> Call Customer </Link>
                        </Flex>

                        <Flex flexDir={'column'} gap={'10px'} bg={'gray.100'} p={'1rem'} rounded={'lg'}>
                            <Heading as={'h3'} size={'md'}>Pickup location</Heading>
                            <Text>
                                asdfasf asf asf asf asf asf as fas fas fasf asf as fas asf
                            </Text>
                        </Flex>

                        <FormControl>
                            <FormLabel htmlFor='otp'>OTP</FormLabel>
                            <Input id='otp' type='text' placeholder={'0000'} value={otp} onChange={handleOtpChange} />
                        </FormControl>

                        <Button colorScheme={'brand'} disabled={!otp}>
                            Start Ride
                        </Button>
                    </Flex>
                    <MapComp />

                </Grid>
            </Container>
        </>
    );
}

export default Details;