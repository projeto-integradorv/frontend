import { createAction, createSlice } from '@reduxjs/toolkit';

export const carregarProdutos = createAction('produtos/carregarProdutos');
export const carregarProduto = createAction('produtos/carregarProduto');

const initialState = [];

const produtosSlice = createSlice({
    name: 'produtos',
    initialState,
    reducers: {
        adicionarTodasProdutos: (state, { payload }) => {
            return payload;
        },
        adicionarProduto: (state, { payload }) => {
            const produtoExistente = state.find(produto => produto.id === payload.id);
            if (!produtoExistente) {
                state.push(payload);
            }
        },
    },
});

// Exort actions
export const { adicionarTodasProdutos, adicionarProduto } = produtosSlice.actions;

export default produtosSlice.reducer;
