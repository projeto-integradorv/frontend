import { createListenerMiddleware } from '@reduxjs/toolkit';
import { carregarLogin, adicionarUser, setError } from './loginSlice';
import { login } from '../../../api/login';
import { useRouter } from 'next/navigation';

export const loginListener = createListenerMiddleware();

loginListener.startListening({
  actionCreator: carregarLogin,
  effect: async (action, { dispatch }) => {
    try {
      const response = await login(action.payload);

      if (response ) {
        const { token, user_id, user_type,card_id } = response;

        if (token && user_id && user_type) {
          
          
          localStorage.setItem('userData', JSON.stringify({ token, user_id, user_type ,card_id}));
          console.log(user_type);
          dispatch(adicionarUser({
            username: action.payload.username,
            password: action.payload.password,
          }));


          if (user_type === 'user') {
            const router = useRouter();
            router.push('/');
          }
        } else {
          throw new Error('Dados de login incompletos.');
        }
      } else {
        throw new Error('Resposta inválida da API.');
      }
    } catch (error) {
      dispatch(setError(error.message || 'Erro desconhecido ao tentar fazer login.'));
    }
  },
});

export default loginListener;
