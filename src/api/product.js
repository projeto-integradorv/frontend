// Arquivo: "@/api/product"

import axiosInstance from '@/utils/axios';

const getProducts = () => axiosInstance.get('/product');
const getProductById = (id) => axiosInstance.get(`/product/${id}`);
const postProduct = (data) => axiosInstance.post('/product', data);
const putProduct = (id, data) => axiosInstance.put(`/product/${id}`, data);

export { getProducts, getProductById, postProduct, putProduct };
