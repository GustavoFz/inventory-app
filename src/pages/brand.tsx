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

export interface BrandPops {
    id: string;
    name: string;
}

const Brand = () => {
    const [name, setName] = useState("");
    const [brandId, setBrand_id] = useState("0");
    const [listBrands, setListBrand] = useState<BrandPops[]>([]);

    useEffect(() => {

        api.get('/brand')
            .then((response) => setListBrand(response.data))
            .catch((error) => console.log(error));
    }, []);

    const handleNewBrand = () => {
        if (!name) return;
        if (verifyBrandName()) {
            alert("Marca já cadastrada!");
            return;
        }

        api.post('/brand', { name })
            .then((response => setListBrand([...listBrands, response.data])))
            .catch((error) => {
                console.log({ status: "socorro", error, data: { name } });
            });

        setName("");
    };

    const verifyKeyword = (key: string) => {
        if (key === 'Enter') {
            handleNewBrand()
        }
    };
    const verifyBrandName = () => {
        return !!listBrands.find((prod) => prod.name === name);
    };

    const removeBrand = async (id: string) => {
        try {

            const { data } = await api.get('brandByProduct/' + id)

            if (data.length) {
                alert("Essa Marca está vinclada a um produto!");
                return;
            }
            api.delete('/brand/' + id)
                .then((response => {
                    console.log(response);
                    const newArray = listBrands.filter((group) => group.id !== response.data.id);
                    setListBrand(newArray);
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
                            placeholder="Nome da Marca"
                            onKeyDown={e => verifyKeyword(e.key)}
                        />
                        <Button
                            disabled={name === '' ? true : false}
                            w="40"
                            onClick={handleNewBrand}
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
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {listBrands.map((item, i) => (
                                    <Tr key={i}>
                                        <Td color="gray.500">{item.name}</Td>
                                        <Td textAlign="end">
                                            <Button
                                                p="2"
                                                h="auto"
                                                fontSize={11}
                                                color="red.500"
                                                fontWeight="bold"
                                                onClick={() => removeBrand(item.id)}
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
export default Brand;