import { configureStore } from "@reduxjs/toolkit";

import carrinhoSlice from "./features/carrinho/carrinhoSlice";
import produtosSlice from "./features/produtos/produtoSlice";
import loginReducer from "./features/login/loginSlice";
import { produtosListener } from "./features/produtos/middlewares";

import adicinaisReducer from "./features/adicionais/adicionaisSlice";
import { adicionalListener } from "./features/adicionais/middlewares";



export const makeStore = () => {
  return configureStore({
    reducer: {
      produtos: produtosSlice,
      carrinho: carrinhoSlice,
      login: loginReducer,
      adicionais: adicinaisReducer,
    },
    middleware:
      getDefaultMiddleware =>
        getDefaultMiddleware().prepend(
          produtosListener.middleware, adicionalListener.middleware
        ),
  });
};
