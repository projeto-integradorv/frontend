import { createListenerMiddleware } from '@reduxjs/toolkit';
import {
    createOrder,
    deleteOrder,
    getOrderById,
    updateOrder
} from '../../../api/order';
import {
    adicionarOrder,
    adicionarPedido,
    apagarPedido,
    atualizarOrder,
    atualizarPedido,
    buscarPedidoPorId,
    patchOrder
} from './pedidoSlice';

export const orderListener = createListenerMiddleware();

orderListener.startListening({
  actionCreator: adicionarPedido,
  effect: async (action, { dispatch }) => {
    try {
      const pedido = action.payload;
      const response = await createOrder(pedido);

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
      const response = await updateOrder(pedido.id, pedido);

      if (response.status === 200) {
        dispatch(atualizarOrder(response.data));
      } else {
        console.error('Erro ao atualizar o pedido:', response);
      }
    } catch (error) {
      console.error('Erro ao atualizar o pedido:', error);
    }
  },
});

orderListener.startListening({
  actionCreator: patchOrder,
  effect: async (action, { dispatch }) => {
    try {
      const pedido = action.payload;
      const response = await updateOrder(pedido.id, pedido);

      if (response.status === 200) {
        dispatch(atualizarOrder(response.data));
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
      const id = action.payload;
      const response = await getOrderById(id);

      if (response && response.data) {
        dispatch(adicionarOrder(response.data));
      } else {
        console.error('Erro ao buscar o pedido pelo ID:', response);
      }
    } catch (error) {
      console.error('Erro ao buscar o pedido pelo ID:', error);
    }
  },
});

export default orderListener;
