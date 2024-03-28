'use client';
import axiosInstance from '@/utils/axios';


const getProductById = (id) => axiosInstance.get(`/product/${id}`);

export default getProductById;