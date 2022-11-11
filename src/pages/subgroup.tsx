import {
    Box,
    Button,
    Flex,
    Input,
    Select,
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
import { GroupPops } from "./group";

export interface SubgroupPops {
    id: string;
    name: string;
    groupId: string;
}

const Produtos = () => {
    const [name, setName] = useState("");
    const [groupId, setGroup_id] = useState("0");
    const [listSubgroups, setListSubgroup] = useState<SubgroupPops[]>([]);
    const [listGroups, setListGroups] = useState<GroupPops[]>([]);

    useEffect(() => {

        api.get('/subgroup')
            .then((response) => setListSubgroup(response.data))
            .catch((error) => console.log(error));

        api.get('/group')
            .then((response) => setListGroups(response.data))
            .catch((error) => console.log(error));

    }, []);

    const handleNewSubgroup = () => {
        if (!name) return;
        if (verifySubgroupName()) {
            alert("Subgrupo já cadastrado!");
            return;
        }

        api.post('/subgroup', { name, groupId })
            .then((response => setListSubgroup([...listGroups, response.data])))
            .catch((error) => {
                console.log({ status: "cocorro", error, data: { name, groupId } });
            });

        setName("");
    };

    const verifySubgroupName = () => {
        return !!listSubgroups.find((prod) => prod.name === name);
    };

    const removeSubgroup = async (id: string) => {
        try {

            const { data } = await api.get('subgroupByGroup/' + id)

            if (data.length) {
                alert("Esse subgrupo está vinclado a um produto!");
                return;
            }
            api.delete('/subgroup/' + id)
                .then((response => {
                    console.log(response);
                    const newArray = listSubgroups.filter((group) => group.id !== response.data.id);
                    setListSubgroup(newArray);
                }
                ))
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const getSubgroupById = (id: string) => {
        return listSubgroups.filter((item: SubgroupPops) => item.id === id)[0]?.name;
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
                            placeholder="Nome do subgrupo"
                        />
                        <Select
                            value={groupId}
                            onChange={(e) => setGroup_id(e.target.value)}>
                            <option value="0">Selecione um grupo</option>
                            {listGroups.map((item, i) => (
                                <option key={i} value={item.id}>
                                    {item.name}</option>
                            ))}
                        </Select>
                        <Button w="40" onClick={handleNewSubgroup}>
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
                                        Grupo
                                    </Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {listSubgroups.map((item, i) => (
                                    <Tr key={i}>
                                        <Td color="gray.500">{item.name}</Td>
                                        <Td color="gray.500">{getSubgroupById(item.groupId)}</Td>
                                        <Td textAlign="end">
                                            <Button
                                                p="2"
                                                h="auto"
                                                fontSize={11}
                                                color="red.500"
                                                fontWeight="bold"
                                                onClick={() => removeSubgroup(item.id)}
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