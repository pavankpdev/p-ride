import {
  Box,
  Flex,
  Avatar,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Image, Text,
  usePrefersReducedMotion,
  keyframes
} from "@chakra-ui/react";
import { BiHistory, BiLogOut } from "react-icons/bi";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../context/user";
import {isConnectedToAllowedChain} from "../../config/allowedChain";
import {useMetaMaskWallet} from "../../hooks/useWallet";

const shake = keyframes`
  0% { transform: translateX(0) }
  25% { transform: translateX(5px) }
  50% { transform: translateX(-5px) }
  75% { transform: translateX(5px) }
  100% { transform: translateX(0) }
`

export default function Navbar() {
  const [switchNetwork, setSwitchNetwork] = useState(false);

  const {user, logout} = useContext(UserContext)

  const wallet = useMetaMaskWallet()

  useEffect(() => {
    if(typeof window === 'undefined') return

    window.ethereum.on('chainChanged', chain => {
        if(isConnectedToAllowedChain(chain)) {
            setSwitchNetwork(false)
        } else {
            setSwitchNetwork(true)
        }
    });
  }, [])

  const prefersReducedMotion = usePrefersReducedMotion()

  const animation = prefersReducedMotion
      ? undefined
      : `${shake} 0.5s infinite`

  return (
    <>
      <Box bg={"white"} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <Box w={{ base: "30%", md: "100px", lg: "120px" }}>
              <Image
                src={"https://i.ibb.co/9VXrDtG/logo.png"}
                alt={"pride logo"}
                w={"100%"}
                h={"100%"}
                objectFit={"cover"}
              />
            </Box>
          </HStack>
          <Flex alignItems={"center"} gap={'1rem'}>
            <Button
                colorScheme={'purple'}
                animation={animation}
                display={!switchNetwork ? "none" : "block"}
                onClick={wallet.switchNetworkHandler}
            >Switch to Polygon</Button>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Flex alignItems={'center'} gap={'5px'}>
                  <Avatar
                      size={"sm"}
                      name={user?.fullname || 'unnamed'}
                  />
                  <Text d={{base: 'none', lg: 'block'}} color={'black'}>{user?.fullname}</Text>
                </Flex>
              </MenuButton>
              <MenuList zIndex={999}>
                <MenuItem icon={<BiHistory />}>Ride History</MenuItem>
                <MenuDivider />
                <MenuItem icon={<BiLogOut />} onClick={logout}>Log Out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
