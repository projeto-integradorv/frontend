// categoriasMiddleware.js
import { createListenerMiddleware } from '@reduxjs/toolkit';
import {
  carregarCategorias,
  carregarCategoria,
  inserirCategoria,
  atualizarCategoria,
  apagarCategoria,
  adicionarTodasCategorias,
  adicionarCategoria,
  mudarLoading,
  categoriaInserida,
  categoriaAtualizada,
  categoriaApagada,
  setError
} from './categoriaSlice';
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  updateCateegory2,
  deleteCategory
} from '../../../api/category';
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
      const novaCategoria = await createCategory(action.payload);
      dispatch(categoriaInserida(novaCategoria));
    } catch (error) {
      dispatch(setError(error.message));
    }
  },
});

categoriasListener.startListening({
  actionCreator: atualizarCategoria,
  effect: async (action, { dispatch }) => {
    try {
      console.log('Atualizando categoria 007:', action.payload.get('id'));
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
