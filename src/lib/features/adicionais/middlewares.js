import { createListenerMiddleware } from '@reduxjs/toolkit';
import { adicionarTodosAdicionais, carregarAdicionais, mudarLoading, atualizarAdicional } from './adicionaisSlice';
import { getAdditional, updateAdditional2 } from '../../../api/additional'

export const adicionalListener = createListenerMiddleware();

adicionalListener.startListening({
    actionCreator: carregarAdicionais,
    effect: async (action, { dispatch, fork }) => {
        const tarefa = fork(async api => {
            dispatch(mudarLoading(true));
            const adicionais = await getAdditional();
            dispatch(adicionarTodosAdicionais(adicionais.data));
            dispatch(mudarLoading(false));
        });

    },
});

adicionalListener.startListening({
    actionCreator: atualizarAdicional,
    effect: async (action, { dispatch, fork }) => {
        const tarefa = fork(async api => {
            const { id, data } = action.payload;
            await updateAdditional2(id, data);
            dispatch(carregarAdicionais());
        });
    },
});

