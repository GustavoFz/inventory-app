import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
    Avatar,
    Box, Flex,
    HStack,
    Icon,
    IconButton,
    Image,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Text,
    useBreakpointValue,
    useColorMode
} from "@chakra-ui/react";
import Router from 'next/router';
import { parseCookies } from 'nookies';
import { useContext, useEffect } from 'react';
import { FiMenu } from "react-icons/fi";
import { AuthContext } from '../contexts/AuthContext';
import { useSidebarContext } from "../contexts/SidebarContext";

const Header = () => {
    const isMobile = useBreakpointValue({
        base: true,
        lg: false,
    });

    const { onOpen }: any = useSidebarContext();

    const { colorMode, toggleColorMode } = useColorMode()

    const { user, logout } = useContext(AuthContext)

    useEffect(() => {

        const { ['inventory-token']: token } = parseCookies()

        if (!token) {
            Router.push('/login')
        }
    }, [])

    return (
        <Flex
            as="header"
            w="100%"
            maxW={1120}
            h="20"
            mx="auto"
            px="2"
            py="2"
            align="center"
            boxShadow="0 1px 0 #ccc"
            color="gray.500"
            fontWeight="bold"
        >
            {isMobile && (
                <IconButton
                    icon={<Icon as={FiMenu} />}
                    onClick={onOpen}
                    variant="unstyled"
                    fontSize="20"
                    mr="2" aria-label={""}
                ></IconButton>
            )}
            <Box maxW="90px" >
                <Image src='/logo.png' />
            </Box>
            <Flex ml="auto">
                <HStack mr='5'>
                    <IconButton
                        onClick={toggleColorMode}
                        aria-label='Call Segun'
                        size='lg'
                        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                    />
                </HStack>
                <HStack>
                    <Text>{user?.name}</Text>
                    <Menu>
                        <MenuButton>
                            <Avatar size="md" />
                        </MenuButton>
                        <MenuList>
                            <MenuItem>Configurações</MenuItem>
                            <MenuDivider />
                            <MenuItem onClick={logout} >Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </HStack>
            </Flex>
        </Flex>
    );
};
export default Header;