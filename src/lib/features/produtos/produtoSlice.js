import { createAction } from '@reduxjs/toolkit';
import { createAppSlice } from '../../createAppSlice';

const initialState = {
    loading: false,
    produtos: [],
    produto: {},
    error: null,
};

export const carregarProdutos = createAction('produtos/carregarProdutos');
export const carregarProduto = createAction('produtos/carregarProduto');
export const inserirProduto = createAction('produtos/inserirProduto', 
    (formData) => ({
        payload: formData,
    })
);

export const editarProduto = createAction('produtos/editarProduto', 
    (formData) => {
        console.log('Atualizando produto:', formData);
        return {
            payload: formData,
        };
    }
);

export const apagarProduto = createAction('produtos/apagarProduto', 
    (id) => ({
        payload: id,
    })
);

export const setError = createAction('produtos/setError');

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

        produtoInserido: (state, { payload }) => {
            state.produtos.push(payload);
        },
        produtoAtualizado: (state, { payload }) => {
            const index = state.produtos.findIndex(prod => prod.id === payload.id);
            if (index !== -1) {
              state.produtos[index] = { ...state.produtos[index], ...payload };
            }
          }
          ,
        produtoApagado: (state, { payload }) => {
            state.produtos = state.produtos.filter(prod => prod.id !== payload);
        },
        setError: (state, { payload }) => {
            state.error = payload;
        },
    },
});

export const {
    adicionarTodasProdutos,
    adicionarProduto,
    mudarLoading,
    produtoInserido,
    produtoAtualizado,
    produtoApagado
} = produtosSlice.actions;

export default produtosSlice.reducer;
