import { createAction } from '@reduxjs/toolkit';

import { createAppSlice } from "../../createAppSlice";

const initialState = {
    loading: false,
    adicionais: [],
    adicional: {
        id: 0,
        nome: '',
        preco: 0,
    },
};

export const carregarAdicionais = createAction('adicionais/carregarAdicionais');
export const atualizarAdicional = createAction('adicionais/atualizarAdicional');


const adicionaisSlice = createAppSlice({
    name: 'adicionais',
    initialState,
    reducers: {
        adicionarTodosAdicionais: (state, { payload }) => {
            state.adicionais = payload;
        },
        adicionarAdicional: (state, { payload }) => {
            state.adicional = payload;
        },
        mudarLoading: (state, { payload }) => {
            state.loading = payload;
        },
    },
});

export const { adicionarTodosAdicionais, adicionarAdicional, mudarLoading } = adicionaisSlice.actions;

export default adicionaisSlice.reducer;