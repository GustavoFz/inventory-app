import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  Switch,
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
import { BrandPops } from "./brand";
import { GroupPops } from "./group";
import { SubgroupPops } from "./subgroup";

export interface ProductPops {
  id: string;
  name: string;
  groupId: string;
  controlSerialNumber: boolean;
  brandId?: string;
  subgroupId?: string;
  barCode?: string;
}

const Produtos = () => {
  const [name, setName] = useState("");
  const [brandId, setBrand_id] = useState("0");
  const [groupId, setGroup_id] = useState("0");
  const [subgroupId, setSubgroup_id] = useState("0");
  const [barCode, setBarCode] = useState("0");
  const [serialNumber, setSerialNumber] = useState("0");
  const [controlSN, setControlSN] = useState(false);
  const [listGroups, setListGroups] = useState<GroupPops[]>([]);
  const [listSubgroups, setListSubgroups] = useState<SubgroupPops[]>([]);
  const [listProducts, setListProducts] = useState<ProductPops[]>([]);
  const [listBrands, setListBrands] = useState<BrandPops[]>([]);



  useEffect(() => {
    api.get('/product')
      .then((response) => setListProducts(response.data))
      .catch((error) => console.log(error));

    api.get('/group')
      .then((response) => setListGroups(response.data))
      .catch((error) => console.log(error));

    api.get('/subgroup')
      .then((response) => setListSubgroups(response.data))
      .catch((error) => console.log(error));

    api.get('/brand')
      .then((response) => setListBrands(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleNewProduct = () => {
    if (!name) return;
    if (verifyProductName()) {
      alert("Produto já cadastrado!");
      return;
    }
    api.post('/product', { name, brandId, subgroupId, groupId, barCode, controlSN })
      .then((response => setListProducts([...listProducts, response.data])))
      .catch((error) => {
        console.log({ status: "socorro", error, data: { name, brandId, subgroupId, groupId, barCode, controlSN } });
      });
    /*
        if (groupId === "0") {
          return alert("Selecione um grupo!");
        }
    
        if (listProducts && listProducts.length) {
          localStorage.setItem(
            "db_products",
            JSON.stringify([...listProducts, { id, name, groupId }])
          );
    
          setListProducts([...listProducts, { id, name, groupId }]);
        } else {
          localStorage.setItem("db_products", JSON.stringify([{ id, name, groupId }]));
    
          setListProducts([{ id, name, groupId }]);
        }
    */
    setName("");
  };
  const verifyProductName = () => {
    return !!listProducts.find((prod) => prod.name === name);
  };

  const removeProduct = async (id: string) => {

    const transaction = await api.get('/transaction/' + id)

    if (transaction.data.length) {
      alert("Esse produto possuí movimentações!");
      return;
    }

    api.delete('product/' + id).then((response) => {
      const newArray = listProducts.filter((prod) => prod.id !== response.data.id);
      setListProducts(newArray)
    })
  };

  const getGroupBySubgroupId = (id: string) => {
    const groupId = listSubgroups.filter((subgrupo: SubgroupPops) => subgrupo.id === id)[0]?.groupId;
    return listGroups.filter((grupo: GroupPops) => grupo.id === groupId)[0]?.name;
  };

  const getSubgroupById = (id: string | undefined) => {
    return listSubgroups.filter((item: SubgroupPops) => item.id === id)[0]?.name;
  };

  const getGroupById = (id: string | undefined) => {
    if (!id) {
      return ""
    }
    return listGroups.filter((item: GroupPops) => item.id === id)[0]?.name;
  };

  const getBrandById = (id: string) => {
    return listBrands.filter((item: BrandPops) => item.id === id)[0]?.name;
  };

  return (
    <Flex h="100vh" flexDirection="column">
      <Header />
      <Flex w="100%" my="6" maxW={1120} mx="auto" px="6" h="100vh">
        <Sidebar />
        <Box w="100%">
          <FormControl as={SimpleGrid} minChildWidth={240} h="fit-content" spacing="6">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome do produto"
            />
            <Select
              value={brandId}
              onChange={(e) => setBrand_id(e.target.value)}>
              <option value="0">Selecione uma Marca</option>
              {listBrands.map((item, i) => (
                <option key={i} value={item.id}>
                  {item.name}</option>
              ))}
            </Select>
            <Select
              value={groupId}
              onChange={(e) => setGroup_id(e.target.value)}>
              <option value="0">Selecione um grupo</option>
              {listGroups.map((item, i) => (
                <option key={i} value={item.id}>
                  {item.name}</option>
              ))}
            </Select>
            <Select
              disabled={groupId === '0' ? true : false}
              value={subgroupId}
              onChange={(e) => setSubgroup_id(e.target.value)}>
              <option value="0">Selecione um subgrupo</option>
              {listSubgroups.map((item, i) => (
                <option key={i} value={item.id}>
                  {item.name}</option>
              ))}
            </Select>
            <FormLabel htmlFor='isChecked' >
              Controla S/N?
              <Switch marginLeft='2' id='isChecked' onChange={() => setControlSN(!controlSN)} />
            </FormLabel>
            {controlSN ?
              <Input
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                placeholder="Nome do produto"
              />
              : ""}
            <Button
              disabled={(subgroupId === '0' || groupId === '0' || name === '') ? true : false}
              w="40"
              onClick={handleNewProduct}
            >
              CADASTRAR
            </Button>
          </FormControl>
          <Box overflowY="auto" height="80vh">
            <Table mt="6">
              <Thead>
                <Tr>
                  <Th fontWeight="bold" fontSize="14px">
                    Nome
                  </Th>
                  <Th fontWeight="bold" fontSize="14px">
                    Marca
                  </Th>
                  <Th fontWeight="bold" fontSize="14px">
                    Grupo
                  </Th>
                  <Th fontWeight="bold" fontSize="14px">
                    Subgrupo
                  </Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {listProducts.map((item, i) => (
                  <Tr key={i}>
                    <Td color="gray.500">{item.name}</Td>
                    <Td color="gray.500">{getBrandById(item.brandId as string)}</Td>
                    <Td color="gray.500">{getGroupById(item.groupId)}</Td>
                    <Td color="gray.500">{getSubgroupById(item.subgroupId)}</Td>
                    <Td textAlign="end">
                      <Button
                        p="2"
                        h="auto"
                        fontSize={11}
                        color="red.500"
                        fontWeight="bold"
                        onClick={() => removeProduct(item.id)}
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
    </Flex >
  );
};
export default Produtos;