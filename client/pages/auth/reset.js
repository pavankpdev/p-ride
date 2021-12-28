import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";

const ResetPassword = () => {
  const [resetInput, setResetInput] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    setResetInput({ ...resetInput, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    console.log(resetInput);
    if (!resetInput.newPassword) {
      alert("Password cannot be empty.");
    } else if (!resetInput.confirmPassword) {
      alert("Password cannot be empty.");
    } else if (resetInput.newPassword !== resetInput.confirmPassword) {
      alert("Password not equal");
      return;
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
          Enter new password
        </Heading>
        <FormControl id="passsword" isRequired>
          <FormLabel>New Password</FormLabel>
          <Input
            type="password"
            value={resetInput.newPassword}
            onChange={handleChange}
            name="newPassword"
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Confirm Pssword</FormLabel>
          <Input
            type="password"
            value={resetInput.confirmPassword}
            onChange={handleChange}
            name="confirmPassword"
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
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default ResetPassword;
