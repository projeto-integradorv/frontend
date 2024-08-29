import { createListenerMiddleware } from '@reduxjs/toolkit';
import { apagarItem, atualizarItems, getCartById, updateItem, zerarItensDoCarrinho } from '../../../api/cart';
import { addCart, adicionarAoCarrinho, apagarItemCart, atualizarCarrinhoInteiro, atualizarItem, atualizarObservacao, atualizarQuantidade, buscarCarrinhoById, removerDoCarrinho, zerarCarrinho } from './carrinhoSlice';

export const cartListener = createListenerMiddleware();

cartListener.startListening({
  actionCreator: apagarItemCart,
  effect: async (action, { dispatch }) => {
    const itemId = action.payload;
    const userData = localStorage.getItem('userData');
    const parsedUserData = JSON.parse(userData);
    const cartId = parsedUserData.cart_id?.id
    try {
      await apagarItem(itemId);
      dispatch(buscarCarrinhoById(cartId));
    } catch (error) {
      console.error("Erro ao apagar o item:", error);

    }
  },
});

cartListener.startListening({
  actionCreator: zerarCarrinho,
  effect: async (action, { dispatch }) => {
    try {
      const cartId = action.payload;

      await zerarItensDoCarrinho(cartId);

      const cart = await getCartById(cartId);

      if (cart && cart.items) {
        dispatch(atualizarCarrinhoInteiro(cart.items));
      }
    } catch (error) {
      console.error("Erro ao zerar o carrinho:", error);
    }
  },
});

cartListener.startListening({
  actionCreator: atualizarItem,
  effect: async (action, { dispatch }) => {
    try {
      const item = action.payload;
      const response = await atualizarItems(item);
      dispatch(atualizarObservacao(response.data));
      dispatch(atualizarQuantidade(response.data));
      dispatch(buscarCarrinhoById(response.data.cart));

    } catch (error) {
      console.error('Erro ao atualizar o item:', error);
    }
  }
});

cartListener.startListening({
  actionCreator: buscarCarrinhoById,
  effect: async (action, { dispatch }) => {
    try {
      const cartId = action.payload;
      const cart = await getCartById(cartId);

      if (cart && cart.items) {
        dispatch(atualizarCarrinhoInteiro(cart.items));
        dispatch(adicionarAoCarrinho({ items: cart.items }));
      }
    } catch (error) {
      console.error("Erro ao buscar o carrinho pelo ID:", error);
    }
  },
});

cartListener.startListening({
  actionCreator: addCart,
  effect: async (action, { dispatch }) => {
    try {
      const cartItem = action.payload;
      const updatedCart = await updateItem(cartItem);
      const userData = localStorage.getItem('userData');
      const parsedUserData = JSON.parse(userData);
      const cartId = parsedUserData.cart_id?.id

      if (cartId) {
        dispatch(buscarCarrinhoById(cartId));
      } else {
        console.error("Dados do carrinho inválidos após atualização:", updatedCart);
      }
    } catch (error) {
      console.error("Erro ao atualizar o carrinho:", error);
    }
  },
});

export default cartListener;
