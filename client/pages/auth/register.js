import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
  Box,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";

const Login = () => {
  const [registerInput, setRegisterInput] = useState({
    email: "",
    password: "",
    fullname: "",
  });

  const router = useRouter();
  const toast = useToast();

  const handleChange = (event) => {
    setRegisterInput({
      ...registerInput,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
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
    } else if (!registerInput.password) {
      toast({
        title: "Password cannot be empty.",
        description: "Please make sure you enter your Password!",
        duration: 3000,
        status: "error",
        isClosable: true,
        position: "top-right",
      });
      return;
    }
  };

  return (
    <Stack minH={"100vh"} direction={{ base: "column", lg: "row-reverse" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Create New Account</Heading>
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
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={registerInput.password}
              name="password"
              placeholder="**********"
              onChange={handleChange}
            />
          </FormControl>
          <Stack spacing={6}>
            <Button
              colorScheme={"blue"}
              variant={"solid"}
              onClick={handleSubmit}
            >
              Create Account
            </Button>
            <Link
              color={"blue.500"}
              textAlign={"center"}
              onClick={() => router.push("/login")}
            >
              Already Have an account? Login
            </Link>
          </Stack>
        </Stack>
      </Flex>

      <Flex flex={1} display={{ base: "none", lg: "block" }}>
        <Box w="100%" h="100vh">
          <Image
            alt={"Login Image"}
            objectFit={"cover"}
            w="100%"
            h="100%"
            src={
              "https://images.unsplash.com/photo-1572013343866-dfdb9b416810?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
            }
          />
        </Box>
      </Flex>
    </Stack>
  );
};

export default Login;
