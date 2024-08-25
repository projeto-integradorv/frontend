import { createAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: []
};


export const buscarCarrinhoById = createAction('carrinho/carrinhoById', (id) => {
  return {
    payload: id,
  };
});

const carrinhoSlice = createSlice({
  name: 'carrinho',
  initialState,
  reducers: {
    adicionarAoCarrinho: (state, { payload }) => {
      const index = state.items.findIndex(item => item.product.id === payload.product.id);
      if (index !== -1) {
        state.items[index].quantity = payload.quantity;
        state.items[index].observation = payload.observation || state.items[index].observation;
      } else {
        state.items.push(payload);
      }
    },
    atualizarQuantidade: (state, { payload }) => {
      const item = state.items[payload.product.id];
      if (item) {
        item.quantity = payload.quantity;
      }
    },
    atualizarObservacao: (state, { payload }) => {
      const item = state.items[payload.product.id];
      if (item) {
        item.observation = payload.observation;
      }
    },
    atualizarCarrinhoInteiro: (state, { payload }) => {
      state.items = payload;
    },
    resetarCarrinho: () => initialState,
  }
});

export const { adicionarAoCarrinho, atualizarQuantidade, atualizarObservacao, atualizarCarrinhoInteiro, resetarCarrinho } = carrinhoSlice.actions;

export default carrinhoSlice.reducer;
