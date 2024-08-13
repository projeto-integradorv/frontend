// cartMiddleware.js
import { createListenerMiddleware } from '@reduxjs/toolkit';
import { adicionarAoCarrinho, resetarCarrinho } from './carrinhoSlice';
import { createCart, updateCart } from '@/utils/api'; // Ajuste o caminho conforme necessário

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

export default cartListener;
