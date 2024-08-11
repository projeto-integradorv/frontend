import { configureStore } from "@reduxjs/toolkit";

import carrinhoSlice from "./features/carrinho/carrinhoSlice";

import produtosSlice from "./features/produtos/produtoSlice";
import { produtosListener } from "./features/produtos/middlewares";


export const makeStore = () => {
  return configureStore({
    reducer: {
      produtos: produtosSlice,
      carrinho: carrinhoSlice,
    },
    middleware:
      getDefaultMiddleware =>
        getDefaultMiddleware().prepend(
          produtosListener.middleware,
        ),
  });
};
