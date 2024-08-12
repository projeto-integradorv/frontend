import { createAction } from '@reduxjs/toolkit';

import { createAppSlice } from "../../createAppSlice";
const initialState = {
    loading: false,
    produtos: [],
    produto: {},
};

export const carregarProdutos = createAction('produtos/carregarProdutos');
export const carregarProduto = createAction('produtos/carregarProduto');

const produtosSlice = createAppSlice({
    name: 'produtos',
    initialState,
    reducers: {
        adicionarTodasProdutos: (state, { payload }) => {
            state.produtos = payload;
        },
        adicionarProduto: (state, { payload }) => {
            state.produto = payload;
        },
        mudarLoading: (state, { payload }) => {
            state.loading = payload;
        },
    },
});
export const { adicionarTodasProdutos, adicionarProduto, mudarLoading } = produtosSlice.actions;

export default produtosSlice.reducer;
