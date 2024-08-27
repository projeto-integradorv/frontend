import { createAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

export const carregarCarrinho = createAction('carrinho/carregarCarrinho');

export const buscarCarrinhoById = createAction('carrinho/carrinhoById', (id) => ({
  payload: id,
}));

export const addCart = createAction('carrinho/addCart', (cartItem) => ({
  payload: cartItem,
}));

export const zerarCarrinho = createAction('carrinho/zerarCarrinho', (id) => ({
  payload: id,
}));

export const apagarItem = createAction('carrinho/apagarItem', (id) => ({
  payload: id,
}));

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
      const { index, quantity } = payload;
      if (state.items[index]) {
        state.items[index].quantity = quantity;
      }
    },

    atualizarObservacao: (state, { payload }) => {
      const { index, observation } = payload;
      if (state.items[index]) {
        state.items[index].observation = observation;
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

    removerDoCarrinho: (state, { payload }) => {
      state.items = state.items.filter(item => item.product?.id !== payload.product?.id);
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
