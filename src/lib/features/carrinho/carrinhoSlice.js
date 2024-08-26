import { createAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Certifica-se de que items é sempre um array.
};

export const carregarCarrinho = createAction('carrinho/carregarCarrinho'); 

// Ação para buscar o carrinho pelo ID
export const buscarCarrinhoById = createAction('carrinho/carrinhoById', (id) => ({
  payload: id,
}));

// Ação para adicionar um item ao carrinho
export const addCart = createAction('carrinho/addCart', (cartItem) => ({
  payload: cartItem,
}));

// Slice para gerenciar o estado do carrinho
const carrinhoSlice = createSlice({
  name: 'carrinho',
  initialState,
  reducers: {
    adicionarAoCarrinho: (state, { payload }) => {
      const index = state.items.findIndex(item => item.product?.id === payload.product?.id);

      if (index !== -1) {
        state.items[index].quantity = payload.quantity;
        state.items[index].observation = payload.observation || state.items[index].observation;
      } else {
        state.items.push(payload);
      }
    },

    atualizarQuantidade: (state, { payload }) => {
      const item = state.items.find(item => item.product?.id === payload.product?.id);
      if (item) {
        item.quantity = payload.quantity;
      }
    },

    atualizarObservacao: (state, { payload }) => {
      const item = state.items.find(item => item.product?.id === payload.product?.id);
      if (item) {
        item.observation = payload.observation;
      }
    },

    atualizarCarrinhoInteiro: (state, { payload }) => {
      
      if (Array.isArray(payload)) {
        payload.forEach((item, index) => {
          console.log(`Item ${index}:`, item);
        });
        state.items = payload;
      } else {
        console.error('Payload inválido para atualizar o carrinho:', payload);
      }
    },
    
    resetarCarrinho: (state) => {
      state.items = [];
    },
  },
});

export const { 
  adicionarAoCarrinho, 
  atualizarQuantidade, 
  atualizarObservacao, 
  atualizarCarrinhoInteiro, 
  resetarCarrinho 
} = carrinhoSlice.actions;

// Exporta o redutor gerado pelo slice
export default carrinhoSlice.reducer;
