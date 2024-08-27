import { createAction, createSlice } from '@reduxjs/toolkit';

// Estado inicial
const initialState = {
  orders: [],
};

// Ações
export const adicionarPedido = createAction('pedido/adicionarPedido', (order) => ({
  payload: order,
}));

export const atualizarPedido = createAction('pedido/atualizarPedido', (order) => ({
  payload: order,
}));

export const patchOrder = createAction('pedido/patchOrder', (order) => ({
  payload: order,
}));

export const apagarPedido = createAction('pedido/apagarPedido', (id) => ({
  payload: id,
}));

export const buscarPedidoPorId = createAction('pedido/buscarPedidoPorId', (id) => ({
  payload: id,
}));

const orderSlice = createSlice({
  name: 'pedido',
  initialState,
  reducers: {
    adicionarOrder: (state, { payload }) => {
      const index = state.orders.findIndex(order => Number(order.id) === Number(payload.id));
      if (index !== -1) {
        state.orders[index] = payload;
      } else {
        state.orders.push(payload);
      }
    },
    atualizarOrder: (state, { payload }) => {
      const { id, ...updates } = payload;
      const order = state.orders.find(order => Number(order.id) === Number(id));
      if (order) {
        Object.assign(order, updates);
      } else {
        console.warn('Pedido não encontrado para o ID:', id);
      }
    },
    removerPedido: (state, { payload }) => {
      state.orders = state.orders.filter(order => Number(order.id) !== payload);
    },
    atualizarPedidosInteiros: (state, { payload }) => {
      if (Array.isArray(payload)) {
        state.orders = payload;
      } else {
        console.error('Payload inválido para atualizar pedidos:', payload);
      }
    },
    resetarPedidos: (state) => {
      state.orders = [];
    },
  },
});

export const {
  adicionarOrder,
  atualizarOrder,
  removerPedido,
  atualizarPedidosInteiros,
  resetarPedidos,
} = orderSlice.actions;

// Exportar o reducer
export default orderSlice.reducer;
