import { createListenerMiddleware } from '@reduxjs/toolkit';
import { } from 'next/navigation';
import { login } from '../../../api/login';
import { adicionarUser, carregarLogin, setError } from './loginSlice';

export const loginListener = createListenerMiddleware();

loginListener.startListening({
  actionCreator: carregarLogin,
  effect: async (action, { dispatch }) => {
    try {
      const response = await login(action.payload);
      const { token, user_id, user_type, cart_id } = response;

      

      if (token && user_id && user_type && cart_id) {
        localStorage.setItem('userData', JSON.stringify({ token, user_id, user_type, cart_id }));
        dispatch(adicionarUser({
          username: action.payload.username,
          password: action.payload.password,
        })); 

        window.location.href = '/';
      }else if(token && user_id && user_type){
        localStorage.setItem('userData', JSON.stringify({ token, user_id, user_type }));
        dispatch(adicionarUser({
          username: action.payload.username,
          password: action.payload.password,
        })); 

        window.location.href = '/admin';
      }
       else {
        throw new Error('Dados de login incompletos.');
      }
    } catch (error) {
      dispatch(setError(error.message || 'Erro desconhecido ao tentar fazer login.'));
    }
  },
});

export default loginListener;
