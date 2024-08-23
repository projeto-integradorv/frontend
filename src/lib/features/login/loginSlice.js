import { createAction, createSlice } from '@reduxjs/toolkit';

// Estado inicial
const initialState = {
    username: '',
    password: '',
    loading: false,
    error: null,
    success: false,
};

// Ações
export const carregarLogin = createAction('login/carregarLogin', (credentials) => ({
    payload: credentials,
}));

export const adicionarUsuario = createAction('login/adicionarUsuario', (user) => ({
    payload: user,
}));

export const setLoginError = createAction('login/setLoginError', (error) => ({
    payload: error,
}));

export const logoutUsuario = createAction('login/logoutUsuario');

// Slice
const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        adicionarUser: (state, { payload }) => {
            state.username = payload.username;
            state.password = payload.password;
            state.loading = false;
            state.success = true;
        },
        setError: (state, { payload }) => {
            state.error = payload;
            state.loading = false;
            state.success = false;
        },
        logoutUser: (state) => {
            state.username = '';
            state.password = '';
            state.loading = false;
            state.error = null;
            state.success = false;
        },
        mudarLoading: (state, { payload }) => {
            state.loading = payload;
        },
    },
});

export const {
    adicionarUser,
    setError,
    logoutUser,
    mudarLoading,
} = loginSlice.actions;

export default loginSlice.reducer;
