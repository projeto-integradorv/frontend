import { createListenerMiddleware } from '@reduxjs/toolkit';
import { apagarItem, atualizarItems, getCartById, updateItem, zerarItensDoCarrinho } from '../../../api/cart';
import { addCart, adicionarAoCarrinho, apagarItemCart, atualizarCarrinhoInteiro, atualizarItem, atualizarObservacao, atualizarQuantidade, buscarCarrinhoById, removerDoCarrinho, zerarCarrinho } from './carrinhoSlice';

export const cartListener = createListenerMiddleware();

cartListener.startListening({
  actionCreator: apagarItemCart,
  effect: async (action, { dispatch }) => {
    try {
      const itemId = action.payload;
      await apagarItem(itemId);
      dispatch(removerDoCarrinho(itemId));
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
      dispatch(atualizarObservacao( item));
      dispatch(atualizarQuantidade(item ));
     
      if (response.status === 200) {
        console.log('Item atualizado com sucesso:', response.data);
      } else {
        console.error('Erro ao atualizar o item:', response);
      }
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

      if (updatedCart && updatedCart.items) {
        dispatch(adicionarAoCarrinho(updatedCart));
      } else {
        console.error("Dados do carrinho inválidos após atualização:", updatedCart);
      }
    } catch (error) {
      console.error("Erro ao atualizar o carrinho:", error);
    }
  },
});

export default cartListener;
