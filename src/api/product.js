// Arquivo: "@/api/product"

import axiosInstance from '@/utils/axios';

const getProducts = async () => {
    const response = await axiosInstance.get('/product');
    return response.data;
}


const getProductById = (id) => {
    const response = axiosInstance.get(`/product/${id}`);
    return response;
};
const postProduct = (data) => axiosInstance.post('/product', data);
const putProduct = (id, data) => axiosInstance.put(`/product/${id}`, data);
const putProduct2 = (id, data) => axiosInstance.patch(`/product/${id}`, data);

export { getProducts, getProductById, postProduct, putProduct, putProduct2 };
