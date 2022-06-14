import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Box,
  useToast, Container,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link"

import axios from "../../config/axios";
import {useMetaMaskWallet} from "../../hooks/useWallet";

const Register = () => {
  const [registerInput, setRegisterInput] = useState({
    email: "",
    fullname: "",
  });

  const router = useRouter();
  const toast = useToast();

  const { connectWallet, signInWithMetamask } = useMetaMaskWallet();

  const handleChange = (event) => {
    setRegisterInput({
      ...registerInput,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (!registerInput.fullname) {
        toast({
          title: "Fullname cannot be empty.",
          description: "Please make sure you enter your Fullname!",
          duration: 3000,
          status: "error",
          isClosable: true,
          position: "top-right",
        });
        return;
      } else if (!registerInput.email) {
        toast({
          title: "Email cannot be empty.",
          description: "Please make sure you enter your email!",
          duration: 3000,
          status: "error",
          isClosable: true,
          position: "top-right",
        });
        return;
      }

      await connectWallet()
      const sign = await signInWithMetamask()

      const registerHandler = await axios({
        method: "POST",
        url: "/auth/register",
        data: {
          ...registerInput,
          address: sign?.account
        }
      });

      localStorage.setItem(
        "pride",
        JSON.stringify({ token: registerHandler.data.token })
      );

      router.push("/")
    } catch (error) {
      toast({
        title: error?.response?.data?.message || "Internal Server Error",
        duration: 3000,
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (

      <Flex h={"100vh"} w={'100vw'} overflow={'hidden'}>
        <Flex
            h={'full'}
            w={'full'}
            bg={'white'}
            alignItems={'center'}
            justify={'center'}
            overflow={'hidden'}
            _after={{
              w: '100%',
              h: '100%',
              content: "''",
              pos: 'absolute',
              zIndex: 10,
              top: 0,
              left: 0,
              bg: 'rgba(0,0,0,0.5)'
            }}
        >

          <video
              loop
              muted
              autoPlay
              preload="auto"
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                zIndex: 5,
                top: 0,
                objectFit: 'cover'
              }}
          >
            <source src={'https://nonceblox.s3.ap-south-1.amazonaws.com//nft/video.mp4'} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <Container d={'flex'} w={'100%'} h={'100vh'} flexDir={'column'} pos={'absolute'} zIndex={20} top={'20%'} >

            <Flex bg={'white'} w={'100%'} h={'fit-content'} py={'3rem'} rounded={'lg'} flexDir={'column'} justify={'center'} alignItems={'center'} gap={'1rem'}>
              <Box w={'150px'} h={'50px'} overflow={'hidden'}>
                <Image src={'https://i.ibb.co/QHf9gxV/logo.png'} w={'100%'} h={'100%'} alt={'logo'} />
              </Box>

              <Stack spacing={4} w={"full"} maxW={"md"}>
                <Heading fontSize={"2xl"} textAlign={'center'}>Create New Account</Heading>
                <FormControl id="fullname">
                  <FormLabel>Full Name</FormLabel>
                  <Input
                      required
                      type="text"
                      value={registerInput.fullname}
                      name="fullname"
                      placeholder="Bharath"
                      onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input
                      type="email"
                      value={registerInput.email}
                      name="email"
                      placeholder="email@email.com"
                      onChange={handleChange}
                  />
                </FormControl>

                <Stack spacing={6}>
                  <Button
                      colorScheme={"brand"}
                      variant={"solid"}
                      onClick={handleSubmit}
                  >
                    Create Account
                  </Button>
                  <Link
                      color={"blue.500"}
                      textAlign={"center"}
                      href={"/auth/login"}

                  >
                    Already Have an account? Login
                  </Link>
                </Stack>
              </Stack>
            </Flex>

          </Container>

        </Flex>

      </Flex>
  );
};

export default Register;
