import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    SimpleGrid,
    Switch,
    useToast
} from "@chakra-ui/react";
import React, { useState } from "react";
import api from "../services/api";

const ModalProduct = ({ data, isOpen, onClose, typeModal, listProducts, setListProducts, listGroups, listSubgroups, listBrands }) => {
    const [name, setName] = useState(data?.name || "")
    const [brandId, setBrand_id] = useState(data?.brandId || "0");
    const [groupId, setGroup_id] = useState(data?.groupId || "0");
    const [subgroupId, setSubgroup_id] = useState(data?.subgroupId || "0");
    const [barCode, setBarCode] = useState(data?.barCode || "");
    const [serialNumber, setSerialNumber] = useState(data?.item?.id || "");
    const [controlSerialNumber, setControlSerialNumber] = useState(data?.controlSerialNumber || false);

    const initialRef = React.useRef(null)

    const toast = useToast()

    const verifyProductName = () => {
        return !!listProducts.find((prod) => prod.name === name);
    };

    const handleCreate = () => {
        if (!name) return;
        if (verifyProductName()) {
            alert("Produto já cadastrado!");
            return;
        }
        api.post('/product', { name, brandId, subgroupId, groupId, barCode, controlSerialNumber, serialNumber })
            .then((response => {
                setListProducts([...listProducts, response.data])
                toast({
                    title: 'Produto cadastrado com sucesso!',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                })
            }))
            .catch((error) => {
                toast({
                    title: 'Erro ao cadastrar produto!',
                    description: error.message,
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                })
                console.log({ status: "socorro", error, data: { name, brandId, subgroupId, groupId, barCode, controlSerialNumber } });
            });
        setName("");
    };

    const handleEdit = () => {
        if (!name || !groupId || !brandId) {
            return
        }
        api.put('/product/' + data.id, { name, brandId, groupId, subgroupId })
            .then((response => {
                const newArray = listProducts.map(product => {
                    if (product.id === response.data.product.id) {
                        return {
                            ...product,
                            name: response.data.product.name,
                            brand: response.data.product.brand,
                            group: response.data.product.group,
                            subgroup: response.data.product.subgroup,
                        }
                    }
                    return product
                });
                setListProducts(newArray);
                toast({
                    title: 'Produto atualizado com sucesso!',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                })
            }))
            .catch((error) => {
                console.log({ status: "socorro", error });
                toast({
                    title: 'Erro ao atualizar produto!',
                    description: error.message,
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                })
            });
        return
    }

    return (

        <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{typeModal === "edit" ? "Editar" : "Cadastrar"} Produto</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
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
                            onChange={(e) => setGroup_id(e.target.value)}
                        >
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
                            <option value="0" >Selecione um subgrupo</option>
                            {listSubgroups.map((item, i) => (
                                <option key={i} value={item.id} >
                                    {item.name}
                                </option>
                            )
                            )}
                        </Select>
                        <Input
                            value={barCode}
                            onChange={(e) => setBarCode(e.target.value)}
                            placeholder="Código de Barras"
                        />
                        <FormLabel htmlFor='isChecked' >
                            Controla S/N?
                            <Switch marginLeft='2' id='isChecked' isChecked={controlSerialNumber ? true : false} onChange={() => setControlSerialNumber(!controlSerialNumber)} />
                        </FormLabel>
                        {controlSerialNumber ?
                            <Input
                                value={serialNumber}
                                onChange={(e) => setSerialNumber(e.target.value)}
                                placeholder="Numero de Serie"
                            />
                            : ""}
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={typeModal === "edit" ? handleEdit : handleCreate} disabled={(subgroupId === '0' || groupId === '0' || name === '') ? true : false}>
                        {typeModal === "edit" ? "atualizar" : "cadastrar"}
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal >
    )
}

export default ModalProduct