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

import { ProductPops } from "./index";

export interface EntrieProps {
    id: string
    value: string
    productId: string
}

const StockEntries = () => {
    const [value, setAmount] = useState("");
    const [product_id, setProduct_id] = useState("0");
    const [listStockEntries, setStockEntries] = useState<EntrieProps[]>([]);
    const [listProducts, setListProducts] = useState<ProductPops[]>([]);

    const transactionType = "entrada"

    useEffect(() => {
        api.get('transactionInput')
            .then((response) => setStockEntries(response.data))
            .catch((error) => console.log(error));

        api.get('/product')
            .then((response) => setListProducts(response.data))
            .catch((error) => console.log(error));

    }, []);

    const handleNewEntry = () => {
        if ((Number(value) <= 0) || (product_id === "0")) {
            return alert("Selecione o produto e a quantidade!");
        }

        api.post('transaction', { productId: product_id, value: Number(value), type: transactionType })
            .then((response) => setStockEntries([...listStockEntries, response.data]))
            .catch((error) => console.log(error));

        setAmount("");
        setProduct_id("0");
    };

    // const removeEntries = (id: string) => {
    //     const newArray = listStockEntries.filter((item) => item.id !== id);

    //     localStorage.setItem("db_stock_entries", JSON.stringify(newArray));

    //     setStockEntries(newArray);
    // };

    const getProductById = (id: string) => {
        return listProducts.filter((item) => item.id === id)[0]?.name;
    };

    return (
        <Flex h="100vh" flexDirection="column">
            <Header />

            <Flex w="100%" my="6" maxW={1120} mx="auto" px="6" h="100vh">
                <Sidebar />

                <Box w="100%">
                    <SimpleGrid minChildWidth={240} h="fit-content" spacing="6">
                        <Select
                            value={product_id}
                            onChange={(e) => setProduct_id(e.target.value)}
                        >
                            <option value="0">Selecione um item</option>
                            {listProducts &&
                                listProducts.length > 0 &&
                                listProducts.map((item, i) => (
                                    <option key={i} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                        </Select>
                        <Input
                            placeholder="Quantidade"
                            type="number"
                            value={value}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        <Button w="40" onClick={handleNewEntry}>
                            SALVAR
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
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {listStockEntries.map((item, i) => (
                                    <Tr key={i}>
                                        <Td color="gray.500">{getProductById(item.productId)}</Td>
                                        <Td color="gray.500">{item.value}</Td>
                                        <Td textAlign="end">
                                            {/* <Button
                                                p="2"
                                                h="auto"
                                                fontSize={11}
                                                color="red.500"
                                                fontWeight="bold"
                                                onClick={() => removeEntries(item.id)}
                                            >
                                                DELETAR
                                            </Button> */}
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

export default StockEntries;