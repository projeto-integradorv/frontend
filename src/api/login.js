import axiosInstance from '@/utils/axios';


export const login = async (data) => {
    try {
        const response = await axiosInstance.post('/auth-token/', data);
        return response.data;
    } catch (error) {
        throw error;
    }
}