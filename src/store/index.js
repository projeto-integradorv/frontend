import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './reducers/cart';

const store = configureStore({
  reducer: {
    carrinho: cartSlice,
  }
});

export default store;