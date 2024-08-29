import axiosInstance from '@/utils/axios';

const getOrders = async () => {
    const response = await axiosInstance.get('/order/');
    return response.data;
};

const getOrderById = async (id) => {
    const response = await axiosInstance.get(`/order/${id}/`);
    return response.data;
};

const createOrder = async (data) => {
    const response = await axiosInstance.post('/order/', data);
    return response.data;
};

const updateOrder = async (id, data) => {
    const response = await axiosInstance.put(`/order/${id}/`, data); 
    return response.data;
};

const patchOrder = async (id, data) => {
    const response = await axiosInstance.patch(`/order/${id}/`, data, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

const deleteOrder = async (id) => {
    await axiosInstance.delete(`/order/${id}/`);
    return id;
};

export {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    patchOrder,
    deleteOrder,
};
