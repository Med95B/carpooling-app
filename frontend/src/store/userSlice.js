import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../config/config';

const baseURL = config.baseURL ; // Récupérer l'URL de base à partir de congi.js

// Action asynchrone pour l'inscription d'un utilisateur
export const registerUser = createAsyncThunk('user/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${baseURL}/users/register`, userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Action asynchrone pour la connexion d'un utilisateur
export const loginUser = createAsyncThunk('user/login', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${baseURL}/users/login`, userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    // Vous pouvez ajouter d'autres reducers selon vos besoins
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
  },
});

// Exportez les actions et le reducer
export const { setUser, logoutUser } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export const selectStatus = (state) => state.user.status;
export const selectError = (state) => state.user.error;

export default userSlice.reducer;
