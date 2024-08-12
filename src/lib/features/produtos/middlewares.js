import { createListenerMiddleware } from '@reduxjs/toolkit';
import { carregarProdutos, adicionarTodasProdutos, carregarProduto } from './produtoSlice';
import { getProducts, getProductById } from '../../../api/product';

export const produtosListener = createListenerMiddleware();

export const produtoCarregado = (produto) => ({
    type: 'produtos/adicionarProduto',
    payload: produto,
});

produtosListener.startListening({
    actionCreator: carregarProdutos,
    effect: async (action, { dispatch, fork }) => {
        const tarefa = fork(async (api) => {
            try {
                const produtos = await getProducts();
                dispatch(adicionarTodasProdutos(produtos));
            } catch (error) {
                console.error('Failed to load products:', error);
            }
        });

        tarefa.cancel();
    },
});

produtosListener.startListening({
    actionCreator: carregarProduto,
    effect: async (action, { dispatch, fork }) => {
        const tarefa = fork(async (api) => {
            try {
                console.log('Loading product:', action.payload);
                const produto = await getProductById(action.payload);
                dispatch(produtoCarregado(produto));
            } catch (error) {
                console.error('Failed to load product:', error);
            }
        });

        tarefa.cancel();
    },
});

export default produtosListener;
