'use client';
import axios from 'axios';
import { HOST_API } from '@/config-global';

// ----------------------------------------------------------------------

let authToken = '';

if (typeof window !== 'undefined') { // Verifica se está no ambiente do cliente
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
        authToken = parsedUserData.token || '';
    }
}

const axiosInstance = axios.create({
    baseURL: HOST_API,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${authToken}`, // Insere o token no cabeçalho de autorização
    }
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
