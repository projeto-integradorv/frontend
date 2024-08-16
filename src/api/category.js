// apiService.js
import axiosInstance from '@/utils/axios';

const getCategories = async () => {
    const response = await axiosInstance.get('/category');
    return response.data;
};

const getCategoryById = async (id) => {
    const response = await axiosInstance.get(`/category/${id}`);
    return response.data;
};

const createCategory = async (data) => {
    const response = await axiosInstance.post('/category/', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }
    );
    return response.data;
};

const updateCategory = async (id, data) => {
    const response = await axiosInstance.put(`/category/${id}/`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};


const updateCategory2 = async (id, data) => {
    const response = await axiosInstance.patch(`/category/${id}`, data);
    return response.data;
};

const deleteCategory = async (id) => {
    await axiosInstance.delete(`/category/${id}`);
    return id;
};

export {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    updateCategory2,
    deleteCategory,
};
