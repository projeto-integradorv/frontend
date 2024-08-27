import { createListenerMiddleware } from '@reduxjs/toolkit';
import { createCart, getCartById, updateCart, updateItem, zerarItensDoCarrinho, apagarItem, atualizarItems } from '../../../api/cart';
import { addCart, adicionarAoCarrinho, apagarItemCart, atualizarCarrinhoInteiro, buscarCarrinhoById, zerarCarrinho, removerDoCarrinho, addItemToCart, atualizarItem, atualizarObservacao, atualizarQuantidade } from './carrinhoSlice';

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
      console.log('item:', item);
      const response = await atualizarItems(item);

      // Passando o `id` ao invés do `index`
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
        // Atualiza o carrinho inteiro com os itens recebidos
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
