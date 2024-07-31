import { createSlice } from '@reduxjs/toolkit';
import img from '../../assets/x-bacon.jpeg';


const initialState = [
  {
    nome: "X-Salada",
    descricao: "Pão, hambúrguer, queijo, alface e tomate",
    preco: 15.00,
    imagem: img,
    id: "1",
    quanto: 2,
  },
  {
    nome: "X-Bacon",
    descricao: "Pão, hambúrguer, queijo, bacon, alface e tomate",
    preco: 18.00,
    imagem: img,
    id: "2",
    quanto: 1,
  },
  {
    nome: "X-Tudo",
    descricao: "Pão, hambúrguer, queijo, bacon, ovo, alface e tomate",
    preco: 20.00,
    imagem: img,
    id: "3",
    quanto: 1,
  },
  {
    nome: "X-Burguer",
    descricao: "Pão, hambúrguer, queijo, alface e tomate",
    preco: 15.00,
    imagem: img,
    id: "4",
    quanto: 1,
  },
  {
    nome: "X-Salada",
    descricao: "Pão, hambúrguer, queijo, alface e tomate",
    preco: 15.00,
    imagem: img,
    id: "1",
    quanto: 1,
  },
  {
    nome: "X-Bacon",
    descricao: "Pão, hambúrguer, queijo, bacon, alface e tomate",
    preco: 18.00,
    imagem: img,
    id: "2",
    quanto: 1,
  },
  {
    nome: "X-Tudo",
    descricao: "Pão, hambúrguer, queijo, bacon, ovo, alface e tomate",
    preco: 20.00,
    imagem: img,
    id: "3",
    quanto: 1,
  },
  {
    nome: "X-Burguer",
    descricao: "Pão, hambúrguer, queijo, alface e tomate",
    preco: 15.00,
    imagem: img,
    id: "4",
    quanto: 2,
  },

];

const carrinhoSlice = createSlice({
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


