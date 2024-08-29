import { createListenerMiddleware } from '@reduxjs/toolkit';
import {
  createOrder,
  deleteOrder,
  getOrderById,
  updateOrder,
  getOrders
} from '../../../api/order';
import {
  buscarPedidos,
  adicionarOrder,
  adicionarPedido,
  apagarPedido,
  atualizarOrder,
  atualizarPedido,
  buscarPedidoPorId,
  patchOrder,
  setOrdersSuccess,
  setOrdersLoading,
  setOrdersFailed,
  setSelectedOrder
} from './pedidoSlice';

export const orderListener = createListenerMiddleware();

orderListener.startListening({
  actionCreator: buscarPedidos,
  effect: async (action, { dispatch }) => { // Corrigido para passar `dispatch` corretamente
    try {
      dispatch(setOrdersLoading());

      console.log('Buscando pedidos...');
      const response = await getOrders();

      console.log('response', response);

      if (Array.isArray(response)) {
        dispatch(setOrdersSuccess(response)); // Atualiza o estado com a lista de pedidos
      } else {
        dispatch(setOrdersFailed('Nenhum pedido encontrado.'));
      }
    } catch (error) {
      dispatch(setOrdersFailed(error.toString()));
      console.error('Erro ao buscar os pedidos:', error);
    }
  },
});

orderListener.startListening({
  actionCreator: adicionarPedido,
  effect: async (action, { dispatch }) => {
    try {
      const pedido = action.payload;
      
      const response = await createOrder(pedido);

      console.log('response', response);

      if (response && response.data) {
        dispatch(adicionarOrder(response.data));
      } else {
        console.error('Erro ao criar o pedido:', response);
      }
    } catch (error) {
      console.error('Erro ao criar o pedido:', error);
    }
  },
});
orderListener.startListening({
  actionCreator: atualizarPedido,
  effect: async (action, { dispatch }) => {
    try {
      const pedido = action.payload;

      const response = await updateOrder(pedido?.id, pedido);


      if (response && response.id) {
        dispatch(atualizarOrder(response));
      } else {
        throw new Error('Resposta inesperada da API.');
      }
    } catch (error) {
      console.error('Erro ao atualizar o pedido:', error.message);
    }
  },
});


orderListener.startListening({
  actionCreator: patchOrder,
  effect: async (action, { dispatch }) => {
    try {
      const pedido = action.payload;

      console.log('Atualizando pedido:', pedido);
      const response = await updateOrder(pedido.id, pedido);

      console.log('response', response);

      if (response.status === 200) {
        dispatch(atualizarOrder(response));
      } else {
        console.error('Erro ao atualizar o pedido:', response);
      }
    } catch (error) {
      console.error('Erro ao atualizar o pedido:', error);
    }
  },
});

orderListener.startListening({
  actionCreator: apagarPedido,
  effect: async (action, { dispatch }) => {
    try {
      const id = action.payload;
      await deleteOrder(id);
      dispatch(apagarPedido(id));
    } catch (error) {
      console.error('Erro ao apagar o pedido:', error);
    }
  },
});

orderListener.startListening({
  actionCreator: buscarPedidoPorId,
  effect: async (action, { dispatch }) => {
    try {
      const { payload: id } = action;
      console.log(`Buscando pedido com ID: ${id}...`);
      const response = await getOrderById(id);

      if (response) {
        dispatch(setSelectedOrder(response));
      } else {
        dispatch(setOrdersFailed('Pedido não encontrado.'));
      }
    } catch (error) {
      dispatch(setOrdersFailed(error.toString()));
      console.error('Erro ao buscar o pedido:', error);
    }
  },
});

export default orderListener;
