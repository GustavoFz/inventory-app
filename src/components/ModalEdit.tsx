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

const ModalEdit = ({ dataEdit, isOpen, onClose, listUsers, setUsersList }) => {
    const [name, setName] = useState(dataEdit.name || "")
    const [email, setEmail] = useState(dataEdit.email || "")

    const initialRef = React.useRef(null)

    const handleSave = () => {
        if (!name || !email) {
            return
        }

        api.put('/user/' + dataEdit.id, { name, email })
            .then((response => {
                const newArray = listUsers.map(user => {
                    if (user.id === response.data.user.id) {
                        return { ...user, name: response.data.user.name, email: response.data.user.email }
                    }
                    return user
                });
                setUsersList(newArray);
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
                <ModalHeader>Editar usuário</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>Nome</FormLabel>
                        <Input type="text" value={name} ref={initialRef} placeholder='Joaozinho' onChange={(e) => setName(e.target.value)} />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Email</FormLabel>
                        <Input type="text" value={email} placeholder='Exemplo: teste@teste.com' onChange={(e) => setEmail(e.target.value)} />
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

export default ModalEdit