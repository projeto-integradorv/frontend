import { createListenerMiddleware } from '@reduxjs/toolkit';
import {
  carregarCadastro,
  carregarCadastroManeger,
  setError,
  usuarioRegistrado,
  gerenteRegistrado,
  mudarLoading
} from './registerSlice';
import {
  registerAPI,
  registerManegerAPI
} from '../../../api/login';

const registerListener = createListenerMiddleware();

registerListener.startListening({
  actionCreator: carregarCadastro,
  effect: async (action, { dispatch }) => {
    dispatch(mudarLoading(true));
    try {
      const userData = action.payload;
      const response = await registerAPI(userData);
      console.log(response);
      dispatch(usuarioRegistrado(response));
    } catch (error) {
      dispatch(setError(error.message));
      console.error("Erro ao registrar usuário:", error);
    } finally {
      dispatch(mudarLoading(false));
    }
  },
});

registerListener.startListening({
  actionCreator: carregarCadastroManeger,
  effect: async (action, { dispatch }) => {
    dispatch(mudarLoading(true));
    try {
      const userData = action.payload;
      const response = await registerManegerAPI(userData);
      dispatch(gerenteRegistrado(response));
    } catch (error) {
      dispatch(setError(error.message));
      console.error("Erro ao registrar gerente:", error);
    } finally {
      dispatch(mudarLoading(false));
    }
  },
});

export default registerListener;
