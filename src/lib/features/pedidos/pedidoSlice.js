import { createSlice, createAction } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  selectedOrder: null
};

// Ações
export const buscarPedidos = createAction('pedido/buscarPedidos');

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

// Slice
const orderSlice = createSlice({
  name: 'pedido',
  initialState,
  reducers: {
    adicionarOrder: (state, { payload }) => {
      if (Array.isArray(payload)) {
        state.orders = payload;
      } else {
        const index = state.orders.findIndex(order => Number(order?.id) === Number(payload.id));
        if (index !== -1) {
          state.orders[index] = payload;
        } else {
          state.orders.push(payload);
        }
      }
    },
    atualizarOrder: (state, { payload }) => {
      const { id, ...updates } = payload;
      const order = state.orders.find(order => Number(order?.id) === Number(id));
      if (order) {
        Object.assign(order, updates);
      } else {
        console.warn('Pedido não encontrado para o ID:', id);
      }
    },
    removerPedido: (state, { payload }) => {
      state.orders = state.orders.filter(order => Number(order?.id) !== Number(payload));
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
    setSelectedOrder(state, action) {
      state.selectedOrder = action.payload;
    },
    setOrdersLoading: (state) => {
      state.status = 'loading';
    },
    setOrdersSuccess: (state, { payload }) => {
      state.status = 'succeeded';
      state.orders = payload;
    },
    setOrdersFailed: (state, { payload }) => {
      state.status = 'failed';
      state.error = payload;
    },
  },
});

// Exportar ações
export const {
  adicionarOrder,
  atualizarOrder,
  removerPedido,
  atualizarPedidosInteiros,
  resetarPedidos,
  setOrdersLoading,
  setSelectedOrder,
  setOrdersSuccess,
  setOrdersFailed,
} = orderSlice.actions;

export default orderSlice.reducer;
