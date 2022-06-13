import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Box,
  useToast,
  Video, Container, Text
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "../../config/axios";
import Link from "next/link"
import {IoPersonAdd} from 'react-icons/io5'

// HOOKS
import {useMetaMaskWallet} from "../../hooks/useWallet";

const Login = () => {
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  const toast = useToast();

  const { connectWallet, signInWithMetamask } = useMetaMaskWallet();

  const handleSubmit = async () => {
    try {

       await connectWallet()
       const sign = await signInWithMetamask()

      const loginHandler = await axios({
        method: "POST",
        url: "/auth/login",
        data: { address: sign.account },
      });

      localStorage.setItem(
        "pride",
        JSON.stringify({ token: loginHandler.data.token })
      );

      router.push("/")
    } catch (error) {
      toast({
        title: error?.response?.data?.error || "Internal Server Error",
        description: "Please make sure you enter your Password!",
        duration: 3000,
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const redirectToRegisterPage = () => {
      router.push('/auth/register')
  }

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
          <source src={'https://vod-progressive.akamaized.net/exp=1655161542~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F3664%2F14%2F368320203%2F1524051052.mp4~hmac=076f3357a644e56e43c18ac16dcb141a1691f9ff7a373f3a71b57080418eed0a/vimeo-prod-skyfire-std-us/01/3664/14/368320203/1524051052.mp4'} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <Container d={'flex'} w={'100%'} h={'100vh'} flexDir={'column'} pos={'absolute'} zIndex={20} top={'20%'} >

          <Flex bg={'white'} w={'100%'} h={'fit-content'} py={'1rem'} rounded={'lg'} flexDir={'column'} justify={'center'} alignItems={'center'} gap={'1rem'}>
              <Box w={'150px'} h={'50px'} overflow={'hidden'}>
                <Image src={'https://i.ibb.co/QHf9gxV/logo.png'} w={'100%'} h={'100%'} alt={'logo'} />
              </Box>

              <Text fontSize={'lg'} textAlign={'center'} fontWeight={600}>Hello user, welcome back to Peer ride :). </Text>
              <Button colorScheme={'orange'} size={'lg'} onClick={handleSubmit}>
                 <Flex bg={'white'}  p={'.3rem'} h={'80%'} w={'30%'} rounded={'lg'} mr={'1rem'}>
                   <Image src={'https://i.ibb.co/f1rPnWc/metamask.png'} alt={'metamask logo'} objectFit={'contain'} w={'100%'} h={'100%'} />
                 </Flex>
                Login with metamask
              </Button>
            <Button colorScheme={'brand'} variant={'ghost'} size={'lg'} leftIcon={<IoPersonAdd />} onClick={redirectToRegisterPage} >Create new account</Button>
          </Flex>

        </Container>

      </Flex>

    </Flex>
  );
};

export default Login;
