import { createAsyncThunk } from '@reduxjs/toolkit';
import { registerAPI } from '../../../api/login'; 
export const carregarCadastro = createAsyncThunk(
  'register/carregarCadastro',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerAPI(userData);
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response.data); 
    }
  }
);
