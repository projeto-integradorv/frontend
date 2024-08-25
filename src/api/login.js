import axiosInstance from '@/utils/axios';


export const login = async (data) => {
    try {
        const response = await axiosInstance.post('/auth-token/', data);
        return response.data;
    } catch (error) {
        throw error;
    }
}


export const registerAPI = async (data) => {
    try {
        const response = await axiosInstance.post('/customers/', data);
        return response.data;
    } catch (error) {
        throw error;
    }
}


export const registerManegerAPI = async (data) => {
    try {
        const response = await axiosInstance.post('/managers/', data);
        return response.data;
    } catch (error) {
        throw error;
    }
}