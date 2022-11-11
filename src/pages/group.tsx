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
    Tr
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import api from "../services/api";


export interface GroupPops {
    id: string;
    name: string;
}

const Produtos = () => {
    const [name, setName] = useState("");
    const [listGroups, setListGroup] = useState<GroupPops[]>([]);

    useEffect(() => {

        api.get('/group')
            .then((response) => setListGroup(response.data))
            .catch((error) => console.log(error))
    }, []);

    const handleNewGroup = () => {
        if (!name) {
            alert("Informe o nome do grupo");
            return;
        }
        if (verifyGroupName()) {
            alert("Grupo já cadastrado!");
            return;
        }

        api.post('/group', { name })
            .then((response => setListGroup([...listGroups, response.data])))
            .catch((error) => {
                console.log(error);
            });

        setName("");
    };

    const verifyGroupName = () => {
        return !!listGroups.find((prod) => prod.name === name);
    };

    const removeGroup = async (id: string) => {
        try {

            const { data } = await api.get('/subgroupByGroup/' + id)

            if (data.length) {
                alert("Esse grupo está vinclado a um subgrupo!");
                return;
            }
            api.delete('/group/' + id)
                .then((response => {
                    console.log(response);
                    const newArray = listGroups.filter((group) => group.id !== response.data.id);
                    setListGroup(newArray);
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nome do grupo"
                        />
                        <Button w="40" onClick={handleNewGroup}>
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
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {listGroups.map((item, i) => (
                                    <Tr key={i}>
                                        <Td color="gray.500">{item.name}</Td>
                                        <Td textAlign="end">
                                            <Button
                                                p="2"
                                                h="auto"
                                                fontSize={11}
                                                color="red.500"
                                                fontWeight="bold"
                                                onClick={() => removeGroup(item.id)}
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
        </Flex>
    );
};
export default Produtos;