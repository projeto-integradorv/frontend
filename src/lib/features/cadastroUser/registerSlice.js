import { createSlice } from '@reduxjs/toolkit';
import { carregarCadastro } from './registerThunks'; 


const registerSlice = createSlice({
  name: 'register',
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(carregarCadastro.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(carregarCadastro.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(carregarCadastro.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message;
      });
  }
});

export const { resetState } = registerSlice.actions;
export default registerSlice.reducer;
