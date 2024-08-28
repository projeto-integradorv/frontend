import { createListenerMiddleware } from '@reduxjs/toolkit';
import {
    carregarProdutos,
    carregarProduto,
    inserirProduto,
    editarProduto,
    apagarProduto,
    adicionarTodasProdutos,
    adicionarProduto,
    mudarLoading,
    produtoInserido,
    produtoAtualizado,
    produtoApagado,
    setError,
    carregarProdutosByCategory
} from './produtoSlice';
import {
    getProducts,
    getProductById,
    postProduct,
    putProduct,
    deleteProduct
} from '../../../api/product';

const produtosListener = createListenerMiddleware();

produtosListener.startListening({
    actionCreator: carregarProdutos,
    effect: async (action, { dispatch }) => {
        dispatch(mudarLoading(true));
        try {
            
            const produtos = await getProducts(action.payload);
            dispatch(adicionarTodasProdutos(produtos));
        } catch (error) {
            dispatch(setError(error.message));
        } finally {
            dispatch(mudarLoading(false));
        }
    },
});

produtosListener.startListening({
    actionCreator: carregarProduto,
    effect: async (action, { dispatch }) => {
        dispatch(mudarLoading(true));
        try {
            const produto = await getProductById(action.payload);
            dispatch(adicionarProduto(produto));
        } catch (error) {
            dispatch(setError(error.message));
        } finally {
            dispatch(mudarLoading(false));
        }
    },
});

produtosListener.startListening({
    actionCreator: carregarProdutosByCategory,
    effect: async (action, { dispatch }) => {
        dispatch(mudarLoading(true));
        try {
            
            const produto = await getProductById(action.payload, action.payload.get('category'));
            dispatch(adicionarProduto(produto));
        } catch (error) {
            dispatch(setError(error.message));
        } finally {
            dispatch(mudarLoading(false));
        }
    },
});

produtosListener.startListening({
    actionCreator: inserirProduto,
    effect: async (action, { dispatch }) => {
        try {
            console.log('Inserindo produto:', action.payload);
            const novoProduto = await postProduct(action.payload);
            dispatch(produtoInserido(novoProduto));
            dispatch(carregarProdutos());
        } catch (error) {
            dispatch(setError(error.message));
        }
    },
});

produtosListener.startListening({
    actionCreator: editarProduto,
    effect: async (action, { dispatch }) => {
        try {
            const produtoAtualizadoData = await putProduct(action.payload.get('id'), action.payload);
            console.log('Editando produto 0008:', produtoAtualizadoData);
            dispatch(produtoAtualizado(produtoAtualizadoData));
            dispatch(carregarProdutos());
        } catch (error) {
            dispatch(setError(error.message));
        }
    },
});

produtosListener.startListening({
    actionCreator: apagarProduto,
    effect: async (action, { dispatch }) => {
        try {
            await deleteProduct(action.payload);
            dispatch(produtoApagado(action.payload));
        } catch (error) {
            dispatch(setError(error.message));
        }
    },
});

export default produtosListener;
