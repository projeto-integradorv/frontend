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

export const apagarItemCart = createAction('carrinho/apagarItem', (id) => ({
  payload: id,
}));

export const atualizarItem = createAction('carrinho/atualizarItem', (item) => ({
  payload: item,
}));
const carrinhoSlice = createSlice({
  name: 'carrinho',
  initialState,
  reducers: {
    adicionarAoCarrinho: (state, { payload }) => {
      const index = state.items.findIndex(item => Number(item.product?.id) === Number(payload.product?.id));

      if (index !== -1) {
        state.items[index].quantity = payload.quantity;
        state.items[index].observation = payload.observation || state.items[index].observation;
      } else {
        state.items.push({
          ...payload,
          index: state.items.length,
        });
      }
    },

    atualizarQuantidade: (state, { payload }) => {
      const { id, quantity } = payload;
      const item = state.items.find(item => Number(item?.id) === Number(id));
      if (item) {
        item.quantity = quantity;
      } else {
        console.warn('Item não encontrado para o ID:', id);
      }
    },
    
    
    atualizarObservacao: (state, { payload }) => {
      const { id, observation } = payload;
      const item = state.items.find(item => Number(item?.id )=== Number(id));
      if (item) {
        item.observation = observation;
      }
    },
    

    atualizarCarrinhoInteiro: (state, { payload }) => {
      if (Array.isArray(payload)) {
          const updatedItems = payload.map((item, index) => ({
              ...item,
              index,
          }));
          state.items = updatedItems;
      } else {
          console.error('Payload inválido para atualizar o carrinho:', payload);
      }
  },

    removerDoCarrinho: (state, { payload }) => {
      state.items = state.items.filter(item => Number(item?.id) !== payload);
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
  resetarCarrinho,
  removerDoCarrinho,
} = carrinhoSlice.actions;

// Exporta o redutor gerado pelo slice
export default carrinhoSlice.reducer;
