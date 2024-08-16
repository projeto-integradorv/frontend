// categoriasMiddleware.js
import { createListenerMiddleware } from '@reduxjs/toolkit';
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory
} from '../../../api/category';
import {
  adicionarCategoria,
  adicionarTodasCategorias,
  apagarCategoria,
  atualizarCategoria,
  carregarCategoria,
  carregarCategorias,
  categoriaApagada,
  categoriaAtualizada,
  categoriaInserida,
  inserirCategoria,
  mudarLoading,
  setError
} from './categoriaSlice';
const categoriasListener = createListenerMiddleware();

categoriasListener.startListening({
  actionCreator: carregarCategorias,
  effect: async (action, { dispatch }) => {
    dispatch(mudarLoading(true));
    try {
      const categorias = await getCategories();
      dispatch(adicionarTodasCategorias(categorias));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(mudarLoading(false));
    }
  },
});

categoriasListener.startListening({
  actionCreator: carregarCategoria,
  effect: async (action, { dispatch }) => {
    dispatch(mudarLoading(true));
    try {
      const categoria = await getCategoryById(action.payload);
      dispatch(adicionarCategoria(categoria));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(mudarLoading(false));
    }
  },
});

categoriasListener.startListening({
  actionCreator: inserirCategoria,
  effect: async (action, { dispatch }) => {
    try {
      console.log('Inserindo categoria:', action.payload);
      const novaCategoria = await createCategory(action.payload );
      dispatch(categoriaInserida(novaCategoria));
      dispatch(carregarCategorias());
    } catch (error) {
      dispatch(setError(error.message));
    }
  },
});

categoriasListener.startListening({
  actionCreator: atualizarCategoria,
  effect: async (action, { dispatch }) => {
    try {
      const _categoriaAtualizada = await updateCategory(action.payload.get('id'), action.payload);
      dispatch(categoriaAtualizada(_categoriaAtualizada));
    } catch (error) {
      dispatch(setError(error.message));
    }
  },
});

categoriasListener.startListening({
  actionCreator: apagarCategoria,
  effect: async (action, { dispatch }) => {
    try {
      await deleteCategory(action.payload);
      dispatch(categoriaApagada(action.payload));
    } catch (error) {
      dispatch(setError(error.message));
    }
  },
});

export default categoriasListener;
