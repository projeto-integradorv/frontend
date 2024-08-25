import { configureStore } from "@reduxjs/toolkit";
import carrinhoSlice from "./features/carrinho/carrinhoSlice";
import produtosSlice from "./features/produtos/produtoSlice";
import loginReducer from "./features/login/loginSlice";
import categoriasListener from "./features/categoria/middlewares";
import categoriasSlice from "./features/categoria/categoriaSlice";
import produtosListener from "./features/produtos/middlewares";
import { adicionalListener } from "./features/adicionais/middlewares";
import adicionalSlice  from "./features/adicionais/adicionaisSlice";
import loginListener from "./features/login/middlewares";
import registerListener from "./features/cadastroUser/middlewares";
import registerSlice from "./features/cadastroUser/registerSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      produtos: produtosSlice,
      carrinho: carrinhoSlice,
      login: loginReducer,
      categorias: categoriasSlice,
      adicionais: adicionalSlice,
      register: registerSlice,

    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        categoriasListener.middleware,
        produtosListener.middleware,
        adicionalListener.middleware,
        loginListener.middleware,
        registerListener.middleware
      ),
  });
};
