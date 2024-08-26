import { createListenerMiddleware } from '@reduxjs/toolkit';
import { createCart, getCartById, updateCart, updateItem } from '../../../api/cart';
import { addCart, adicionarAoCarrinho, atualizarCarrinhoInteiro, buscarCarrinhoById } from './carrinhoSlice';

export const cartListener = createListenerMiddleware();

// cartListener.startListening({
//   actionCreator: adicionarAoCarrinho,
//   effect: async (action, { dispatch }) => {
//     try {
//       const cartItem = action.payload;

//       // Obtenha o carrinho existente
//       const existingCart = await getCartById(cartItem.id);


//       if (existingCart && existingCart.items) {
//         const updatedItems = cartItem.items.map(item => ({
//           ...item,
//           product: item.product?.id, // Enviar apenas o ID do produto
//         }));

//         const updatedCart = await updateCart(existingCart.id, {
//           items: [...existingCart.items, ...updatedItems],
//         });

//         if (updatedCart && updatedCart.items) {
//           dispatch(adicionarAoCarrinho(updatedCart));
//         } else {
//           console.error("Dados do carrinho inválidos após atualização:", updatedCart);
//         }
//       } else {
//         console.error("Dados do carrinho inválidos:", existingCart);
//       }
//     } catch (error) {
//       console.error("Erro ao adicionar ao carrinho:", error.message || error);
//     }
//   },
// });




cartListener.startListening({
  actionCreator: buscarCarrinhoById,
  effect: async (action, { dispatch }) => {
    try {
      const cartId = action.payload;
      const cart = await getCartById(cartId);
      console.log("Carrinho encontrado:", cart);

      if (cart && cart.items) {
        dispatch(atualizarCarrinhoInteiro(cart.items));
        dispatch(adicionarAoCarrinho(cart));
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
      console.log("Carrinho atualizado:", updatedCart);
      
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
