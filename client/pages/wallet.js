import {
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Divider,
  Container,
  Input,
  Button,
} from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import Web3 from "web3";

// COMPONENT
import Navbar from "../components/navbar";

// HOOKS
import { useMetaMaskWallet } from "../hooks/useMetamask";

// CONTRACTS
import ContractInstances from "../utils/contractInstances";

export default function Simple() {
  const [balance, setBalance] = useState('100');

  const {connectWallet, account} = useMetaMaskWallet()

  const getBalance = useCallback( async (account) => {
    
    const contracts = ContractInstances.instances;
    const PriToken = contracts.PriToken;

    const balance = await PriToken.methods.balanceOf(account).call()

    setBalance(Web3.utils.fromWei(`${balance}`))

  }, [connectWallet])

  useEffect(() => {

    connectWallet(getBalance)

  }, [getBalance])
  



  return (
    <>
      <Navbar />
      <Container maxW={"container.xl"}>
        <Grid templateRows="1fr" gap={4}>
          <GridItem p={"1rem"} rounded={"md"}>
            <Heading color={"brand.500"}>My Wallet</Heading>
            <Divider my={"10px"} />
            <Flex justify={"space-between"}>
              <Flex flexDir={"column"}>
                <Heading
                  as={"h6"}
                  size={"xs"}
                  textTransform={"uppercase"}
                  color={"gray.400"}
                >
                  Balance
                </Heading>
                <Flex align={"baseline"} gap={"5px"}>
                  <Heading size={"3xl"}>{balance}</Heading>
                  <Text fontSize={"lg"} fontWeight={"600"}>
                    $PRI
                  </Text>
                </Flex>
              </Flex>
              <Flex flexDir={"column"}>
                <Heading
                  as={"h6"}
                  size={"xs"}
                  textTransform={"uppercase"}
                  color={"gray.400"}
                  p={"5px"}
                >
                  User Wallet Address
                </Heading>
                <Flex align={"baseline"} gap={"5px"}>
                  <Text
                    bg={"gray.100"}
                    border={"gray.500"}
                    rounded={"lg"}
                    p={"10px"}
                  >
                    {account}
                  </Text>
                  <Button colorScheme="blue" size="sm">
                    Copy
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </GridItem>
          <GridItem>
          <Divider my={"10px"} />
            <Flex justify={"space-between"}>
              <Flex flexDir={"column"}>
                <Heading
                  as={"h6"}
                  size={"xs"}
                  textTransform={"uppercase"}
                  color={"gray.400"}
                >
                  Balance
                </Heading>
                <Flex align={"baseline"} gap={"5px"}>
                  <Heading size={"3xl"}>{balance}</Heading>
                  <Text fontSize={"lg"} fontWeight={"600"}>
                    $PRI
                  </Text>
                </Flex>
              </Flex>
              <Flex flexDir={"column"}>
                <Heading
                  as={"h6"}
                  size={"xs"}
                  textTransform={"uppercase"}
                  color={"gray.400"}
                  p={"5px"}
                >
                  Driver Wallet Address
                </Heading>
                <Flex align={"baseline"} gap={"5px"}>
                  <Text
                    bg={"gray.100"}
                    border={"gray.500"}
                    rounded={"lg"}
                    p={"10px"}
                  >
                    {account}
                  </Text>
                  <Button colorScheme="blue" size="sm">
                    Confirm
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          
          </GridItem>

          <GridItem p={"1rem"} rounded={"md"}>
            <Heading color={"brand.500"}>Transaction</Heading>
            <Divider my={"10px"} />
            <TableContainer>
              <Table variant="striped">
                <Thead>
                  <Tr color={"gray.400"}>
                    <Th>Name</Th>
                    <Th>Date</Th>
                    <Th isNumeric>Amount</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Person 1</Td>
                    <Td>12-03-2018</Td>
                    <Td isNumeric>25.4</Td>
                  </Tr>
                  <Tr>
                    <Td>Person 2</Td>
                    <Td>12-03-2018</Td>
                    <Td isNumeric>30.48</Td>
                  </Tr>
                  <Tr>
                    <Td>Person 3</Td>
                    <Td>12-03-2018</Td>
                    <Td isNumeric>120</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </GridItem>
        </Grid>
      </Container>
    </>
  );
}
