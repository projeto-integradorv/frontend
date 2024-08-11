import { createListenerMiddleware } from '@reduxjs/toolkit';
import { carregarProdutos, adicionarTodasProdutos } from './produtoSlice';
import { getProducts } from '../../../api/product'

export const produtosListener = createListenerMiddleware();

produtosListener.startListening({
    actionCreator: carregarProdutos,
    effect: async (action, { dispatch, fork, unsubscribe }) => {
        const tarefa = fork(async api => {
            const produtos = await getProducts();
            dispatch(adicionarTodasProdutos(produtos));
        }
        );
        unsubscribe(() => {
            tarefa.abort();
        });
    }
});

export default produtosListener;