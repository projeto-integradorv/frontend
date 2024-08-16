import { configureStore } from "@reduxjs/toolkit";

import carrinhoSlice from "./features/carrinho/carrinhoSlice";
import produtosSlice from "./features/produtos/produtoSlice";
import loginReducer from "./features/login/loginSlice";
import categoriasListener from "./features/categoria/middlewares";
import categoriasSlice from "./features/categoria/categoriaSlice";
import produtosListener from "./features/produtos/middlewares";

import { adicionalListener } from "./features/adicionais/middlewares";
import adicionalSlice  from "./features/adicionais/adicionaisSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      produtos: produtosSlice,
      carrinho: carrinhoSlice,
      login: loginReducer,
      categorias: categoriasSlice,
      adicionais: adicionalSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        categoriasListener.middleware,
        produtosListener.middleware,
        adicionalListener.middleware
      ),
  });
};
