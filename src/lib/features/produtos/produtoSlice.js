import { createAction } from '@reduxjs/toolkit';

import { createAppSlice } from "../../createAppSlice";
const initialState = [];

export const carregarProdutos = createAction('produtos/carregarProdutos');

const produtosSlice = createAppSlice({
    name: 'produtos',
    initialState,
    reducers: {
        adicionarTodasProdutos: (state, { payload }) => {
            return payload;
        },
    },
});
export const { adicionarTodasProdutos } = produtosSlice.actions;

export default produtosSlice.reducer;
