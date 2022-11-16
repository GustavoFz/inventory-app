import {
    Box,
    Button,
    Checkbox,
    Container, FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Stack, useBreakpointValue,
    useColorModeValue
} from '@chakra-ui/react'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Logo } from '../components/Logo'
import { AuthContext } from '../contexts/AuthContext'

const Login = () => {

    const { register, handleSubmit } = useForm();
    const { signIn } = useContext(AuthContext)

    async function handleSignIn(data: any) {
        await signIn(data);
    }

    return (
        <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
            <Stack spacing="8">
                <Stack spacing="6">
                    <Logo />
                    <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                        <Heading size={useBreakpointValue({ base: 'xs', md: 'sm' })}>
                            Log in to your account
                        </Heading>
                    </Stack>
                </Stack>
                <Box
                    py={{ base: '0', sm: '8' }}
                    px={{ base: '4', sm: '10' }}
                    bg={useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })}
                    boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
                    borderRadius={{ base: 'none', sm: 'xl' }}
                >
                    <Stack spacing="6">
                        <Stack spacing="5">
                            <FormControl>
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <Input {...register('email')} id="email" type="email" />

                                <FormLabel htmlFor="email">Password</FormLabel>
                                <Input {...register('password')} id="password" type="password" />
                            </FormControl>
                        </Stack>
                        <HStack justify="space-between">
                            <Checkbox defaultChecked>Remember me</Checkbox>
                            <Button variant="link" colorScheme="blue" size="sm">
                                Forgot password?
                            </Button>
                        </HStack>
                        <Stack spacing="6">
                            <Button onClick={handleSubmit(handleSignIn)} bg="gray.700" variant="primary">Sign in</Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Container>
    )
}
export default Login;