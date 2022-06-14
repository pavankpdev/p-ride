import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import {useState} from "react";
import axiosInstance from "configs/axios";
import {useRouter} from "next/router";

export default function Auth() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter();

    const handleEmailChange = (e: any) => setEmail(e.target.value)
    const handlePasswordChange = (e: any) => setPassword(e.target.value)

    const submit = async () => {
        try {
            if(!email || !password) {
                alert('Please fill all the input fields')
                return
            }

            const driverLoginDto = {
                email,
                password,
            }

            const {data} = await axiosInstance({
                method: 'POST',
                url: '/auth/driver-login',
                data: driverLoginDto
            })

            localStorage.setItem(
                "pride-driver",
                JSON.stringify({ token: data.token })
            );

            router.push("/")
        } catch (err: any) {
            console.log(err)
        }
    }

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Heading textAlign={'center'} fontSize={'4xl'}>Sign in to your driver account</Heading>

                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" value={email} onChange={handleEmailChange} />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input type="password" value={password} onChange={handlePasswordChange} />
                        </FormControl>
                        <Stack spacing={10}>

                            <Button
                                colorScheme={'brand'}
                                onClick={submit}
                            >
                                Sign in
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}