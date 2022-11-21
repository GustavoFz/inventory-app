import {
    Box,
    Button,
    Flex,
    Input,
    SimpleGrid,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useDisclosure
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import ModalEdit from "../components/ModalEdit";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

export interface UserProps {
    id: string;
    name: string;
    email: string;
    role: string;
}

const User = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [listUsers, setUsersList] = useState<UserProps[]>([]);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [dataEdit, setDataEdit] = useState({})

    useEffect(() => {

        api.get('/user')
            .then((response) => setUsersList(response.data))
            .catch((error) => console.log(error));
    }, []);

    const handleNewUser = () => {
        if (!email) return;
        if (verifyUserEmail()) {
            alert("Email já cadastrado!");
            return;
        }

        api.post('/user', { email, name, password, role: 'admin' })
            .then((response => setUsersList([...listUsers, response.data])))
            .catch((error) => {
                console.log({ status: "error", error, data: { email, name, password } });
            });

        setName("");
    };

    const verifyKeyword = (key: string) => {
        if (key === 'Enter') {
            handleNewUser()
        }
    };
    const verifyUserEmail = () => {
        return !!listUsers.find((prod) => prod.email === email);
    };

    const removeUser = async (id: string) => {
        try {
            api.delete('/user/' + id)
                .then((response => {
                    console.log(response);
                    const newArray = listUsers.filter((user) => user.id !== response.data.id);
                    setUsersList(newArray);
                }
                ))
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Flex h="100vh" flexDirection="column">
            <Header />

            <Flex w="100%" my="6" maxW={1120} mx="auto" px="6" h="100vh">
                <Sidebar />

                <Box w="100%">
                    <SimpleGrid minChildWidth={240} h="fit-content" spacing="6">
                        <Input
                            type={"name"}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nome"
                            onKeyDown={e => verifyKeyword(e.key)}
                        />
                        <Input
                            type={"email"}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            onKeyDown={e => verifyKeyword(e.key)}
                        />
                        <Input
                            type={"password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Senha"
                            onKeyDown={e => verifyKeyword(e.key)}
                        />
                        <Button
                            disabled={name === '' ? true : false}
                            w="40"
                            onClick={handleNewUser}
                        >
                            CADASTRAR
                        </Button>
                    </SimpleGrid>

                    <Box overflowY="auto" height="80vh">
                        <Table mt="6">
                            <Thead>
                                <Tr>
                                    <Th fontWeight="bold" fontSize="14px">
                                        Nome
                                    </Th>
                                    <Th fontWeight="bold" fontSize="14px">
                                        Email
                                    </Th>
                                    <Th></Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {listUsers.map((item, i) => (
                                    <Tr key={i}>
                                        <Td color="gray.500">{item.name}</Td>
                                        <Td color="gray.500">{item.email}</Td>
                                        <Td textAlign="end">
                                            <Button
                                                margin="1"
                                                p="2"
                                                h="auto"
                                                fontSize={11}
                                                color="red.500"
                                                fontWeight="bold"
                                                onClick={() => [setDataEdit(item), onOpen()]}
                                            >
                                                EDITAR
                                            </Button>

                                            <Button
                                                margin="1"
                                                p="2"
                                                h="auto"
                                                fontSize={11}
                                                color="red.500"
                                                fontWeight="bold"
                                                onClick={() => removeUser(item.id)}
                                            >
                                                DELETAR
                                            </Button>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </Box>
                </Box>
            </Flex>
            {isOpen && (
                <ModalEdit
                    isOpen={isOpen}
                    onClose={onClose}
                    dataEdit={dataEdit}
                    listUsers={listUsers}
                    setUsersList={setUsersList}
                />
            )}
        </Flex>
    );
};
export default User;