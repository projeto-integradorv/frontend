import axiosInstance from '@/utils/axios';

const getAdditional = () => { 
    const response = axiosInstance.get('/additional/')
    return response
};
const getAdditionalById = (id) => {
    const response = axiosInstance.get(`/additional/${id}`)
    return response.data
};
const createAdditional = (data) => axiosInstance.post('/additional/', data);
const updateAdditional = (id, data) => axiosInstance.put(`/additional/${id}/`, data);
const updateAdditional2 = (id, data) => axiosInstance.patch(`/additional/${id}/`, data);
const deleteAdditional = (id) => axiosInstance.delete(`/additional/${id}`);


export { getAdditional, getAdditionalById, createAdditional, updateAdditional, updateAdditional2, deleteAdditional };