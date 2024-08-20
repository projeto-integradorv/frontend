import { createAction } from '@reduxjs/toolkit';
import { createAppSlice } from '../../createAppSlice';

const initialState = {
    loading: false,
    categorias: [],
    categoria: {},
    error: null,
};

export const carregarCategorias = createAction('categorias/carregarCategorias');
export const carregarCategoria = createAction('categorias/carregarCategoria', (id) => {
    return {
        payload: id,
    };
}
);
export const inserirCategoria = createAction('categorias/inserirCategoria',
    (formData) => {
        return {
            payload: formData,
        };
    }
);
export const atualizarCategoria = createAction('categorias/atualizarCategoria',
    (formData) => {
        console.log('Atualizando categoria ????', formData);
        return {
            payload: formData,
        };
    }
);
export const apagarCategoria = createAction('categorias/apagarCategoria', (id) => {
    return {
        payload: id,
    };
}
);

export const setError = createAction('categorias/setError');

const categoriasSlice = createAppSlice({
    name: 'categorias',
    initialState,
    reducers: {
        adicionarTodasCategorias: (state, { payload }) => {
            state.categorias = payload;
        },
        adicionarCategoria: (state, { payload }) => {
            state.categoria = payload;
        },
        mudarLoading: (state, { payload }) => {
            state.loading = payload;
        },
        categoriaInserida: (state, { payload }) => {
            state.categorias.push(payload);
        },
        categoriaAtualizada: (state, { payload }) => {
            const index = state.categorias.findIndex(cat => cat.id === payload.id);
            if (index !== -1) {
                state.categorias[index] = payload;
            }
        },
        categoriaApagada: (state, { payload }) => {
            state.categorias = state.categorias.filter(cat => cat.id !== payload);
        },
        setError: (state, { payload }) => {
            state.error = payload;
        }
    },
});

export const {
    adicionarTodasCategorias,
    adicionarCategoria,
    mudarLoading,
    categoriaInserida,
    categoriaAtualizada,
    categoriaApagada,
} = categoriasSlice.actions;

export default categoriasSlice.reducer;
