import axiosInstance from '@/utils/axios';


const getCart = () => axiosInstance.get('/cart/');
const getCartById = (id) => axiosInstance.get(`/cart/${id}`);
const createCart = (data) => axiosInstance.post('/cart/', data);
const updateCart = (id, data) => axiosInstance.put(`/cart/${id}`, data);
const updateCart2 = (id, data) => axiosInstance.putch(`/cart/${id}`, data);
const deleteCart = (id) => axiosInstance.delete(`/cart/${id}`);

export { getCart, getCartById, createCart, updateCart, updateCart2, deleteCart };