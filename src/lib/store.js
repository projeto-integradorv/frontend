import { configureStore } from "@reduxjs/toolkit";
import carrinhoSlice from "./features/carrinho/carrinhoSlice";
import produtosSlice from "./features/produtos/produtoSlice";
import loginReducer from "./features/login/loginSlice";
import { produtosListener } from "./features/produtos/middlewares";


export const makeStore = () => {
  return configureStore({
    reducer: {
      produtos: produtosSlice,
      carrinho: carrinhoSlice,
      login: loginReducer,

    },
    middleware:
      getDefaultMiddleware =>
        getDefaultMiddleware().prepend(
          produtosListener.middleware,
        ),
  });
};
