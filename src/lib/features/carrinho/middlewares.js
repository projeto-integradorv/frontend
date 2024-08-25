// cartMiddleware.js
import { createListenerMiddleware } from '@reduxjs/toolkit';
import { createCart, getCartById, updateCart } from '../../../api/cart'; // Ajuste o caminho conforme necessário
import { adicionarAoCarrinho, buscarCarrinhoById } from './carrinhoSlice';

export const cartListener = createListenerMiddleware();

cartListener.startListening({
  actionCreator: adicionarAoCarrinho,
  effect: async (action, { dispatch, fork, unsubscribe }) => {
    try {
      const cartItem = action.payload;
      const existingCart = await getCart(); 

      if (existingCart.data.items.length === 0) {
        await createCart({ items: [cartItem] });
      } else {
        await updateCart(existingCart.data.id, { items: [...existingCart.data.items, cartItem] });
      }
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error);
    }
  },
});

cartListener.startListening({
  actionCreator:buscarCarrinhoById,
  effect: async (action, { dispatch }) => {
    try {
      const cart = await getCartById(action.payload);
      dispatch(adicionarAoCarrinho(cart));
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error);
    }
  },
});

export default cartListener;
