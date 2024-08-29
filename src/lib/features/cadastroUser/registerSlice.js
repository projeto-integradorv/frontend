import { createSlice, createAction } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  usuario: null,
  gerente: null,
  error: null,
};

export const carregarCadastro = createAction('register/carregarCadastro', (userData) => {
  return {
    payload: userData,
  };
});
export const carregarCadastroManeger = createAction('register/carregarCadastroManeger', (userData) => {
  return {
    payload: userData,
  };
}
);

// Criação do slice
const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    mudarLoading: (state, { payload }) => {
      state.loading = payload;
    },
    usuarioRegistrado: (state, { payload }) => {
      state.usuario = payload;
    },
    gerenteRegistrado: (state, { payload }) => {
      state.gerente = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(carregarCadastro, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(carregarCadastroManeger, (state) => {
        state.loading = true;
        state.error = null;
      });
  },
});

export const {
  mudarLoading,
  usuarioRegistrado,
  gerenteRegistrado,
  setError,
} = registerSlice.actions;

export default registerSlice.reducer;
