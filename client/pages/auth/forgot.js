import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

import axios from "../../config/axios";

const ForgotPassword = () => {
  const [forgotPasswordInput, setForgotPasswordInput] = useState({ email: "" });

  const handleChange = (event) => {
    setForgotPasswordInput({ email: event.target.value });
  };

  const toast = useToast();

  const handleSubmit = async () => {
    try {
      if (!forgotPasswordInput.email) {
        toast({
          title: "Email cannot be empty.",
          description: "Please make sure you enter your email!",
          duration: 3000,
          status: "error",
          isClosable: true,
          position: "top",
        });
        return;
      }

      const forgotHandler = await axios({
        method: "post",
        url: "/auth/forgot",
        data: { payload: forgotHandler },
      });
      console.log(forgotHandler);

      localStorage.setItem(
        "pride",
        JSON.stringify({ token: forgotPasswordaInput.data.token })
      );
    } catch (error) {
      console.log({ error });
      toast({
        title: error?.response?.data?.error || "Internal Server Error",
        description: "Please make sure you enter your email!",
        duration: 3000,
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Forgot your password?
        </Heading>
        <Text
          fontSize={{ base: "sm", sm: "md" }}
          color={useColorModeValue("gray.800", "gray.400")}
        >
          You&apos;ll get an email with a reset link
        </Text>
        <FormControl id="email">
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
            value={forgotPasswordInput.email}
            onChange={handleChange}
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
            onClick={handleSubmit}
          >
            Request Reset
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default ForgotPassword;
