// loginSlice.js
import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    usuario: null,
    loading: false,
    error: null,
    success: false, // Estado para verificar o sucesso do login
  },
  reducers: {
    carregarLogin: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    adicionarUsuario: (state, action) => {
      state.usuario = action.payload;
      state.loading = false;
      state.success = true; // Indica que o login foi bem-sucedido
    },
    setLoginError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.success = false; // Indica que o login falhou
    },
  },
});

export const { carregarLogin, adicionarUsuario, setLoginError } = loginSlice.actions;

export default loginSlice.reducer;
