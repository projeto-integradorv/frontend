// loginSlice.js
import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    email: '',
    senha: '',
    loading: false,
    error: null,
    success: false, 
  },
  reducers: {
    carregarLogin: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    adicionarUsuario: (state, action) => {
      state.email = action.payload;
      state.senha = action.payload;
      state.loading = false;
      state.success = true; 
    },
    setLoginError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.success = false; 
    },
  },
});

export const selectUsuario = (state) => state.login.email;

export const { carregarLogin, adicionarUsuario, setLoginError } = loginSlice.actions;

export default loginSlice.reducer;
