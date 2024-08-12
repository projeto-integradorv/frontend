import { createListenerMiddleware } from '@reduxjs/toolkit';
import { carregarProdutos, adicionarTodasProdutos, carregarProduto, adicionarProduto, mudarLoading } from './produtoSlice';
import { getProducts, getProductById } from '../../../api/product'

export const produtosListener = createListenerMiddleware();

produtosListener.startListening({
    actionCreator: carregarProdutos,
    effect: async (action, { dispatch, fork, unsubscribe }) => {
        const tarefa = fork(async api => {
            const produtos = await getProducts();
            dispatch(adicionarTodasProdutos(produtos));
        }
        );
    },
});

produtosListener.startListening({
    actionCreator: carregarProduto,
    effect: async (action, { dispatch, fork, unsubscribe }) => {
        const tarefa = fork(async api => {
            const produto = await getProductById(action.payload);
            dispatch(mudarLoading(true));
            dispatch(adicionarProduto(produto.data));
            dispatch(mudarLoading(false));
        });
    },
});

export default produtosListener;