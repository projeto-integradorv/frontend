import { createAction } from '@reduxjs/toolkit';

import { createAppSlice } from "../../createAppSlice";
const initialState = [];

export const carregarProdutos = createAction('produtos/carregarProdutos');
export const carregarProduto = createAction('produtos/carregarProduto');

const produtosSlice = createAppSlice({
    name: 'produtos',
    initialState,
    reducers: {
        adicionarTodasProdutos: (state, { payload }) => {
            return payload;
        },
        adicionarProduto: (state, { payload }) => {
            state.push(payload);
        },

    },
});
export const { adicionarTodasProdutos } = produtosSlice.actions;

export default produtosSlice.reducer;
