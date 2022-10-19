import {
    Avatar,
    Box,
    Button,
    Flex,
    HStack,
    Icon,
    IconButton,
    Image,
    Text,
    useBreakpointValue,
    useColorMode,
} from "@chakra-ui/react";
import { MoonIcon, PhoneIcon, SunIcon } from '@chakra-ui/icons'
import React from "react";
import { useSidebarContext } from "../contexts/SidebarContext";
import { FiMenu } from "react-icons/fi";

const Header = () => {
    const isMobile = useBreakpointValue({
        base: true,
        lg: false,
    });

    const { onOpen }: any = useSidebarContext();

    const { colorMode, toggleColorMode } = useColorMode()

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
                    mr="2" aria-label={""}                ></IconButton>
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
                    <Text>Gustavo Franco</Text>
                    <Avatar size="md" name="Gustavo Franco" />
                </HStack>
            </Flex>
        </Flex>
    );
};

export default Header;