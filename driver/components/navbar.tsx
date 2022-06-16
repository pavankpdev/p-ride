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
} from "@chakra-ui/react";
import { BiHistory, BiLogOut } from "react-icons/bi";
import {useContext} from "react";

import {DriverContext} from "context/driver";

export default function Navbar() {

    const {driver, logout} = useContext(DriverContext)

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
                    <Flex alignItems={"center"}>
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
                                        name={driver?.fullname}
                                    />
                                    <Text color={'black'}>{driver?.fullname}</Text>
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
