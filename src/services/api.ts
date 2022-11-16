import axios from 'axios';
import { parseCookies } from 'nookies';

const { 'inventory-token': token } = parseCookies()

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
})

if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`
}

export default api