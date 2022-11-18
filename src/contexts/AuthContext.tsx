import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, useEffect, useState } from "react";
import api from "../services/api";

interface SignInProps {
    email: string,
    password: string,
}

interface UserProps {
    name: string,
    email: string,
}

interface UserTokenProps {
    data: {
        token: string,
        user: {
            name: string,
            email: string,
        }
    }

}

interface AuthContextProps {
    isAuthenticated: boolean,
    user: UserProps | null,
    signIn: (data: SignInProps) => Promise<void>,
    logout: () => void
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: any) {
    const [user, setUser] = useState<UserProps | null>(null)
    const isAuthenticated = !!user;

    useEffect(() => {
        const { 'inventory-token': token } = parseCookies()

        if (token) {
            api.get('/userByToken/' + token).then(response => {
                setUser(response.data)
            })
        }
    }, []);

    async function signIn({ email, password }: SignInProps) {
        const { data }: UserTokenProps = await api.post('auth/login', { email, password })

        setCookie(undefined, 'inventory-token', data.token, {
            maxAge: 60 * 60 * 1, // 1 hour
        })

        api.defaults.headers['Authorization'] = `Bearer ${data.token}`

        setUser(data.user)

        Router.push('/balance')
    }

    async function logout() {

        api.defaults.headers['Authorization'] = ''

        destroyCookie(undefined, 'inventory-token')
        Router.push('/login')
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, signIn, logout }}>
            {children}
        </AuthContext.Provider>
    )
}