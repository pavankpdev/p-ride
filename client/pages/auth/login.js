import {
  Button,
  Flex,
  Image,
  Box,
  useToast, Container, Text
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import axios from "../../config/axios";
import {IoPersonAdd} from 'react-icons/io5'

// HOOKS
import {useMetaMaskWallet} from "../../hooks/useWallet";

// CONTEXT
import {UserContext} from "../../context/user";
import {useContext} from "react";

const Login = () => {
  const router = useRouter();
  const toast = useToast();

  const {updateUser} = useContext(UserContext)

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

        updateUser(loginHandler.data.user)

      localStorage.setItem(
        "pride",
        JSON.stringify({ token: loginHandler.data.access_token })
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
          <source src={'https://nonceblox.s3.ap-south-1.amazonaws.com//nft/video.mp4'} type="video/mp4" />
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
