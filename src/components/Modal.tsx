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
} from "@chakra-ui/react"
import React, { useState } from "react"

const ModalEdit = ({ data, dataEdit, setData, isOpen, onClose }) => {
    const [name, setName] = useState(dataEdit.name || "")
    const [email, setEmail] = useState(dataEdit.email || "")

    const initialRef = React.useRef(null)

    const handleSave = () => {
        if (!name || !email) return

        if (Object.keys(dataEdit).length) {
            data[dataEdit.index] = { name, email }
        }
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
                        <Input type="text" value={dataEdit.name} ref={initialRef} placeholder='Joaozinho' />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Email</FormLabel>
                        <Input type="text" value={dataEdit.email} placeholder='Exemplo: teste@teste.com' />
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