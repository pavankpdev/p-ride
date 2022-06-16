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
import {useRouter} from "next/router";

// HOOKS
import {useMetaMaskWallet} from "hooks/useMetamaskWallet";
import axiosInstance from "configs/axios";

export default function Register() {

    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phno, setPhno] = useState('')

    const router = useRouter();
    const {signInWithMetamask} = useMetaMaskWallet()

    const handleEmailChange = (e: any) => setEmail(e.target.value)
    const handleFullNameChange = (e: any) => setFullname(e.target.value)
    const handlePasswordChange = (e: any) => setPassword(e.target.value)
    const handlePhnoChange = (e: any) => {
        if(e.target.value.length > 10) return
        setPhno(e.target.value)
    }

    const submit = async () => {
        try {
            if(!fullname || !email || !password) {
                alert('Please fill all the input fields')
                return
            }

            const metamaskData = await signInWithMetamask();

            const registerDriverDto = {
                fullname,
                email,
                password,
                address: metamaskData?.account,
                phno
            }

            const {data} = await axiosInstance({
                method: 'POST',
                url: '/auth/driver-register',
                data: registerDriverDto
            })

            localStorage.setItem(
                "pride-driver",
                JSON.stringify({ token: data.access_token })
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
            <Stack spacing={8} mx={'auto'} w={'100%'} maxW={'xl'} py={12} px={6}>
                <Heading textAlign={'center'} fontSize={'4xl'}>Sign up as a driver</Heading>

                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <FormControl id="fullname">
                            <FormLabel>Fullname</FormLabel>
                            <Input type="text" value={fullname} onChange={handleFullNameChange} />
                        </FormControl>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" value={email} onChange={handleEmailChange}  />
                        </FormControl>
                        <FormControl id="phno">
                            <FormLabel>Phno</FormLabel>
                            <Input type="number" value={phno} onChange={handlePhnoChange}  />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input type="password" value={password} onChange={handlePasswordChange}  />
                        </FormControl>
                        <Stack spacing={10}>

                            <Button
                                colorScheme={'brand'}
                                onClick={submit}
                            >
                                Register
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}