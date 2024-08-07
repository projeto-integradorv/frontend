import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './reducers/cart';
import produtosSlice from './reducers/products';
import { productListener } from './middlewares/products';

const store = configureStore({
  reducer: {
    carrinho: cartSlice,
    produtos: produtosSlice,
  },
  middleware:
    getDefaultMiddleware =>
      getDefaultMiddleware().prepend(
        productListener.middleware,
      ),
});

export default store;