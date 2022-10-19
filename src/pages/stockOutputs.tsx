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

export interface OutputProps {
    id: string
    value: string
    productId: string
}

const StockOutputs = () => {
    const [value, setValue] = useState("");
    const [productId, setProductId] = useState("0");
    const [listStockOutputs, setStockOutputs] = useState<OutputProps[]>([]);
    const [listProducts, setListProducts] = useState<ProductPops[]>([]);

    const transactionType = "saida"

    useEffect(() => {
        api.get('transactionOutput')
            .then((response) => setStockOutputs(response.data))
            .catch((error) => console.log(error));

        api.get('/product')
            .then((response) => setListProducts(response.data))
            .catch((error) => console.log(error));

    }, []);

    const handleNewOutput = () => {
        if ((Number(value) <= 0) || (productId === "0")) {
            return alert("Selecione o produto e a quantidade!");
        }

        api.post('transaction', { productId: productId, value: Number(value), type: transactionType })
            .then((response) => setStockOutputs([...listStockOutputs, response.data]))
            .catch((error) => console.log(error));

        setValue("");
        setProductId("0");
    };

    // const removeOutput = (id: string) => {
    //     const newArray = listStockOutputs.filter((item) => item.id !== id);

    //     localStorage.setItem("db_stock_outputs", JSON.stringify(newArray));

    //     setStockOutputs(newArray);
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
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
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
                            onChange={(e) => setValue(e.target.value)}
                        />
                        <Button w="40" onClick={handleNewOutput}>
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
                                {listStockOutputs.map((item, i) => (
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
                                                onClick={() => removeOutput(item.id)}
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

export default StockOutputs;