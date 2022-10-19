import React from "react";
import { Link as ChakraLink, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

const SidebarNav = () => {
    const { asPath } = useRouter();

    return (
        <Stack spacing="6">
            <Stack>
                <Text fontSize="xs" fontWeight="bold" color="gray.400">
                    CADASTRO
                </Text>
                <Stack>
                    <Link href="/" >
                        <ChakraLink
                            _hover={{ bg: "gray.100" }}
                            px="4"
                            py="2"
                            borderRadius={5}
                            bg={asPath === "/" ? "gray.200" : ""}
                        >
                            <Text fontSize="md" fontWeight="medium" color="gray.500">
                                PRODUTOS
                            </Text>
                        </ChakraLink>
                    </Link>
                    <Link href="/group">
                        <ChakraLink
                            _hover={{ bg: "gray.100" }}
                            px="4"
                            py="2"
                            borderRadius={5}
                            bg={asPath === "/group" ? "gray.200" : ""}
                        >
                            <Text fontSize="md" fontWeight="medium" color="gray.500">
                                GRUPOS
                            </Text>
                        </ChakraLink>
                    </Link>
                </Stack>
            </Stack>
            <Stack>
                <Text fontSize="xs" fontWeight="bold" color="gray.400">
                    ESTOQUE
                </Text>
                <Stack>
                    <Link href="/balance">
                        <ChakraLink
                            _hover={{ bg: "gray.100" }}
                            px="4"
                            py="2"
                            borderRadius={5}
                            bg={asPath === "/balance" ? "gray.200" : ""}
                        >
                            <Text fontSize="md" fontWeight="medium" color="gray.500">
                                SALDO
                            </Text>
                        </ChakraLink>
                    </Link>
                    <Link href="/stockEntries">
                        <ChakraLink
                            _hover={{ bg: "gray.100" }}
                            px="4"
                            py="2"
                            borderRadius={5}
                            bg={asPath === "/stockEntries" ? "gray.200" : ""}
                        >
                            <Text fontSize="md" fontWeight="medium" color="gray.500">
                                ENTRADAS
                            </Text>
                        </ChakraLink>
                    </Link>
                    <Link href="/stockOutputs">
                        <ChakraLink
                            _hover={{ bg: "gray.100" }}
                            px="4"
                            py="2"
                            borderRadius={5}
                            bg={asPath === "/stockOutputs" ? "gray.200" : ""}
                        >
                            <Text fontSize="md" fontWeight="medium" color="gray.500">
                                SAÍDAS
                            </Text>
                        </ChakraLink>
                    </Link>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default SidebarNav;