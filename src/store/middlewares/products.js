import { createListenerMiddleware } from '@reduxjs/toolkit';
import { carregarProdutos, adicionarProduto } from '@/store/reducers/products';
import { getProducts } from '@/api/product';

export const productListener = createListenerMiddleware();

productListener.startListening({
    actionCreator: carregarProdutos,
    effect: async (action, { dispatch, fork }) => {
    },
});