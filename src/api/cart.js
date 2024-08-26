import axiosInstance from '@/utils/axios';


const getCart = () => axiosInstance.get('/cart/');
const getCartById = async (id) => {
    try {
      const response = await axiosInstance.get(`/cart/${id}/`);
      return response.data; 
    } catch (error) {
      console.error('Erro ao buscar o carrinho:', error);
      throw error;
    }
  };
const createCart = (data) =>{
    try {
        const response = axiosInstance.post('/cart/', data);
        return response;
    }
    catch (error) {
        console.error('Erro ao criar o carrinho:', error);
        throw error;
    }
};
const updateItem = (data) => {
    try {
        const response = axiosInstance.post(`/item-cart/`, data);
        return response;
    }
    catch (error) {
        console.error('Erro ao atualizar o carrinho:', error);
        throw error;
    }
};

const updateCart = (id, data) => {
    try {
        const response = axiosInstance.put(`/cart/${id}/`, data);
        return response;
    }
    catch (error) {
        console.error('Erro ao atualizar o carrinho:', error);
        throw error;
    }
}


const updateCart2 = (id, data) => axiosInstance.patch(`/cart/${id}`, data);
const deleteCart = (id) => axiosInstance.delete(`/cart/${id}`);

export { getCart, getCartById, createCart, updateCart, updateCart2, deleteCart, updateItem };