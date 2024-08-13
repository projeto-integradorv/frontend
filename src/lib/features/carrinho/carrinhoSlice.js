// carrinhoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: []
};

const carrinhoSlice = createSlice({
  name: 'carrinho',
  initialState,
  reducers: {
    adicionarAoCarrinho: (state, { payload }) => {
      const index = state.items.findIndex(item => item.product.id === payload.product.id);
      if (index !== -1) {
        state.items[index].quantity = payload.quantity;
      } else {
        state.items.push(payload);
      }
    },
    atualizarQuantidade: (state, { payload }) => {
      const item = state.items.find(item => item.product.id === payload.product.id);
      if (item) {
        item.quantity = payload.quantity;
      }
    },
    resetarCarrinho: () => initialState,
  }
});

export const { adicionarAoCarrinho, atualizarQuantidade, resetarCarrinho } = carrinhoSlice.actions;

export default carrinhoSlice.reducer;
