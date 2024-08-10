import { createAction } from '@reduxjs/toolkit';

import { createAppSlice } from "../../createAppSlice";
const initialState = [];

export const carregarCarrinho = createAction('carrinho/carregarCarrinho');

const carrinhoSlice = createAppSlice({
    name: 'carrinho',
    initialState,
    reducers: {
        mudarCarrinho: (state, { payload }) => {
            const temItem = state.some(item => item.id === payload);
            if (!temItem) return [
                ...state,
                {
                    id: payload,
                    quantidade: 1
                }
            ];
            return state.filter(item => item.id !== payload);
        },
        mudarQuantidade: (state, { payload }) => {
            state = state.map(itemNoCarrinho => {
                if (itemNoCarrinho.id === payload.id) itemNoCarrinho.quantidade += payload.quantidade;
                return itemNoCarrinho;
            })
        },
        resetarCarrinho: () => initialState,
    }
});

export const { mudarCarrinho, mudarQuantidade, resetarCarrinho } = carrinhoSlice.actions;

export default carrinhoSlice.reducer;
