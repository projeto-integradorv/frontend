import axiosInstance from '@/utils/axios';


export const login = async (data) => {
    try {
        const response = await axiosInstance.post('/token', data);
        return response.data;
    } catch (error) {
        throw error;
    }
}