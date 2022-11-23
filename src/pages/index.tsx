import {
  Box,
  Button,
  Flex,
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
import ModalProduct from "../components/ModalProduct";
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
  serialNumber: string;
  brandId?: string;
  subgroupId?: string;
  barCode?: string;
}

const Produtos = () => {

  const [listGroups, setListGroups] = useState<GroupPops[]>([]);
  const [listSubgroups, setListSubgroups] = useState<SubgroupPops[]>([]);
  const [listProducts, setListProducts] = useState<ProductPops[]>([]);
  const [listBrands, setListBrands] = useState<BrandPops[]>([]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState({})
  const [typeModal, setTypeModal] = useState("")

  useEffect(() => {
    api.get('/product')
      .then((response) => { setListProducts(response.data), console.log(response.data) })
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
          <Button
            w="40"
            onClick={() => { onOpen(), setTypeModal("create") }}>
            CADASTRAR
          </Button>
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
                    <Td color="gray.500">{JSON.stringify(item.item)}</Td>
                    <Td textAlign="end">
                      <Button
                        p="2"
                        h="auto"
                        fontSize={11}
                        color="red.500"
                        fontWeight="bold"
                        onClick={() => { setData(item), setTypeModal("edit"), onOpen() }}
                      >
                        EDITAR
                      </Button>
                    </Td>
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
      {isOpen && (
        <ModalProduct
          isOpen={isOpen}
          onClose={onClose}
          data={data}
          listProducts={listProducts}
          setListProducts={setListProducts}
          listBrands={listBrands}
          listGroups={listGroups}
          listSubgroups={listSubgroups}
          typeModal={typeModal}
        />
      )}
    </Flex >
  );
};
export default Produtos;