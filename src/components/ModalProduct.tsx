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
    ModalOverlay
} from "@chakra-ui/react";
import React, { useState } from "react";
import api from "../services/api";

const ModalProduct = ({ dataEdit, isOpen, onClose, listProducts, setListProducts }) => {
    const [name, setName] = useState(dataEdit.name || "")
    const [brand, setBrand] = useState(dataEdit.brand || "")
    const [group, setGroup] = useState(dataEdit.group || "")
    const [subgroup, setSubgroup] = useState(dataEdit.subgroup || "")

    const initialRef = React.useRef(null)

    const handleSave = () => {
        if (!name || !group || !brand) {
            return
        }

        api.put('/product/' + dataEdit.id, { name, brand, group, subgroup })
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
            }))
            .catch((error) => {
                console.log({ status: "socorro", error });
            });
        return
    }

    return (

        <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Editar produto</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>Nome</FormLabel>
                        <Input type="text" value={name} ref={initialRef} placeholder='Joaozinho' onChange={(e) => setName(e.target.value)} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Brand</FormLabel>
                        <Input type="text" value={brand} placeholder='Exemplo: Dell' onChange={(e) => setBrand(e.target.value)} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Group</FormLabel>
                        <Input type="text" value={group} placeholder='Exemplo: Mouse' onChange={(e) => setGroup(e.target.value)} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Subgroup</FormLabel>
                        <Input type="text" value={subgroup} placeholder='Exemplo: com fio' onChange={(e) => setSubgroup(e.target.value)} />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={handleSave}>
                        Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>

    )
}

export default ModalProduct