import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProducts } from '@/api/product';

const initialState = [];


export const carregarProdutos = createAction('produtos/carregarProdutos');

export const buscarProduto = createAsyncThunk('produtos/buscarProduto', getProducts)


const produtosSlice = createSlice({
    name: 'produtos',
    initialState,

    reducers: {
        adicionarProduto: (state, { payload }) => {
            return payload;
        },
    },
});



export const { adicionarProduto } = produtosSlice.actions;
export default produtosSlice.reducer;


