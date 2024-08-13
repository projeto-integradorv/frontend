import { createListenerMiddleware } from '@reduxjs/toolkit';
import { carregarLogin, adicionarUsuario, setLoginError } from './loginSlice';
import { loginUser } from '../../../api/login'; // Supondo que você tenha um endpoint de login na sua API

export const loginListener = createListenerMiddleware();

loginListener.startListening({
  actionCreator: carregarLogin,
  effect: async (action, { dispatch, fork, unsubscribe }) => {
    const tarefa = fork(async api => {
      try {
        const usuario = await loginUser(action.payload);
        console.log('-----') // Aqui você passa as credenciais de login
        dispatch(adicionarUsuario(usuario.data));
      } catch (error) {
        dispatch(setLoginError(error.message));
      }
    });
  },
});


export default loginListener;
