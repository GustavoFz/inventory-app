import {
    Box,
    Button,
    Flex,
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

import { ProductPops } from "./index";

export interface BalancePops {
    productId: string;
    productName: string;
    value: number;
}


function Balance() {
    const [listProducts, setListProducts] = useState<ProductPops[]>([]);
    const [productFiltered, setProductFiltered] = useState("");
    const [cmbProducts, setCmbProducts] = useState([]);

    const BuildBalanceArray = () => {
        api.get('/balance').then((response) => {
            setListProducts(response.data)
            setCmbProducts(response.data)
        }).catch((error) => { console.log(error) });
    };

    useEffect(() => {
        BuildBalanceArray();
    }, []);

    const handleFilterProducts = () => {
        if (!productFiltered) {
            setListProducts(cmbProducts);
            return;
        }
        const newArray = cmbProducts.filter(
            (item: BalancePops) => item.productId === productFiltered
        );

        setListProducts(newArray);
    };

    return (
        <Flex h="100vh" flexDirection="column">
            <Header />

            <Flex w="100%" my="6" maxW={1120} mx="auto" px="6" h="100vh">
                <Sidebar />

                <Box w="100%">
                    <SimpleGrid minChildWidth={240} h="fit-content" spacing="6">
                        <Select
                            value={productFiltered}
                            onChange={(e) => setProductFiltered(e.target.value)}
                        >
                            <option value="">Selecione um item</option>
                            {cmbProducts &&
                                cmbProducts.length > 0 &&
                                cmbProducts.map((item: BalancePops, i) => (
                                    <option key={i} value={item.productId}>
                                        {item.productName}
                                    </option>
                                ))}
                        </Select>
                        <Button w="40" onClick={handleFilterProducts}>
                            FILTRAR
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
                                        Qtd.
                                    </Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {listProducts.map((item, i) => (
                                    <Tr key={i}>
                                        <Td color="gray.500">{item.productName}</Td>
                                        <Td color="gray.500">{item.value}</Td>
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

export default Balance;