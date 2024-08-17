// Arquivo: "@/api/product"

import axiosInstance from '@/utils/axios';

const getProducts = async () => {
    try {
        const response = await axiosInstance.get('/product');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Erro ao buscar os produtos.');
    }
};

const getProductById = async (id) => {
    try {
        const response = await axiosInstance.get(`/product/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || `Erro ao buscar o produto com id ${id}`);
    }
};

const postProduct = async (data) => {
    console.log('data ------', data);
    try {
        const response = await axiosInstance.post('/product/', data,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Erro ao inserir o produto.');
    }
};

const putProduct = async (id, data) => {
        const response = await axiosInstance.put(`/product/${id}/`, data , {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
        );

        console.log('res', response.data);
        
        return response.data;
   
};

const putProduct2 = async (id, data) => {
    try {
        const response = await axiosInstance.patch(`/product/${id}`, data);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || `Erro ao atualizar parcialmente o produto com id ${id}.`);
    }
};

const deleteProduct = async (id) => {
    try {
        const response = await axiosInstance.delete(`/product/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || `Erro ao apagar o produto com id ${id}.`);
    }
};

export { getProducts, getProductById, postProduct, putProduct, putProduct2, deleteProduct };
