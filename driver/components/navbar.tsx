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
    Image,
} from "@chakra-ui/react";
import { BiHistory, BiLogOut } from "react-icons/bi";
import { FaWallet } from "react-icons/fa";
import { RiSettingsFill } from "react-icons/ri";

export default function Navbar() {
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
                                <Avatar
                                    size={"sm"}
                                    src={
                                        "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                                    }
                                />
                            </MenuButton>
                            <MenuList zIndex={999}>
                                <MenuItem icon={<BiHistory />}>Ride History</MenuItem>
                                <MenuDivider />
                                <MenuItem icon={<BiLogOut />}>Log Out</MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}
