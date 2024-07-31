import axiosInstance from '@/utils/axios';

const getCategories = () => axiosInstance.get('/category');
const getCategoryById = (id) => axiosInstance.get(`/category/${id}`);
const createCategory = (data) => axiosInstance.post('/category', data);
const updateCategory = (id, data) => axiosInstance.put(`/category/${id}`, data);
const updateCategory2 = (id, data) => axiosInstance.putch(`/category/${id}`, data);
const deleteCategory = (id) => axiosInstance.delete(`/category/${id}`);


export { getCategories, getCategoryById, createCategory, updateCategory, updateCategory2, deleteCategory };