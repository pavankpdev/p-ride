import Lottie from 'react-lottie';
import { Button, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

// ASSET
import SuccessLoading from '../asset/69013-successful-check.json'

const Complete = () => {

    const router = useRouter()

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: SuccessLoading,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    const goBack = () => {
        router.push('/')
        router.reload()
    }

    return <>
        <Container maxW={'container.xl'} w={'100%'} h={'100vh'} >
            <Flex
                flexDir={'column'}
                w={'full'}
                h={'full'}
            >
                <Container p={'2rem'} textAlign={'center'}>
                    <Lottie
                        options={defaultOptions}
                        height={400}
                        width={400}
                    />

                    <Container maxW={'container.sm'} mt={'-4rem'} display={'flex'} flexDir={'column'} gap={'10px'}>
                        <Heading>Ride Complete</Heading>
                        <Text>You have successfully completed your ride.</Text>
                        <Button colorScheme={'brand'} variant={'ghost'} onClick={goBack}>Go back</Button>
                    </Container>
                </Container>

            </Flex>
        </Container>
    </>
}

export default Complete;