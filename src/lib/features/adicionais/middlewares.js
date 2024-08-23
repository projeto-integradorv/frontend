import { createListenerMiddleware } from '@reduxjs/toolkit';
import { adicionarTodosAdicionais, carregarAdicionais, mudarLoading, atualizarAdicional, createAdicional } from './adicionaisSlice';
import { getAdditional, updateAdditional2, createAdditional } from '../../../api/additional'

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


adicionalListener.startListening({
    actionCreator: createAdicional,
    effect: async (action, { dispatch, fork }) => {
        const tarefa = fork(async api => {
            const { name, price } = action.payload;
            await createAdditional({ name, price });
            dispatch(carregarAdicionais());
        });
    },
});

