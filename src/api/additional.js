import axiosInstance from '@/utils/axios';

const getAdditional = () => axiosInstance.get('/additional/');
const getAdditionalById = (id) => axiosInstance.get(`/additional/${id}`);
const createAdditional = (data) => axiosInstance.post('/additional/', data);
const updateAdditional = (id, data) => axiosInstance.put(`/additional/${id}`, data);
const updateAdditional2 = (id, data) => axiosInstance.putch(`/additional/${id}`, data);
const deleteAdditional = (id) => axiosInstance.delete(`/additional/${id}`);


export { getAdditional, getAdditionalById, createAdditional, updateAdditional, updateAdditional2, deleteAdditional };