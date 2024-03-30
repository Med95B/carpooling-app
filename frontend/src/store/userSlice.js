import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../config/axiosWithAuth';



// Action asynchrone pour l'inscription d'un utilisateur
export const registerUser = createAsyncThunk('user/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(`/register`, userData);
    // Sauvegarder le token dans le localStorage
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Action asynchrone pour la connexion d'un utilisateur
export const loginUser = createAsyncThunk('user/login', async (userData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(`/login`, userData);
    // Sauvegarder le token dans le localStorage
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Action asynchrone pour mettre à jour le rôle de l'utilisateur (isDriver)
export const updateUserRole = createAsyncThunk('user/updateRole', async (data, { rejectWithValue }) => {
  const {  isDriver } = data;
  try {
    const response = await axiosInstance.put(`/updateRole`, { isDriver });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Action asynchrone pour inviter un user au covoiturage
export const sendCarpoolInvitation = createAsyncThunk(
  'user/sendCarpoolInvitation',
  async ({ recipientId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/invite`, { recipientId });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Action pour la déconnexion d'un utilisateur
export const logoutUser = () => (dispatch) => {
  // Supprimer le token du localStorage
  localStorage.removeItem('token');
  dispatch(setUser(null));
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
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
      })
      .addCase(updateUserRole.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
      .addCase(sendCarpoolInvitation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendCarpoolInvitation.fulfilled, (state) => {
        state.status = 'succeeded';
        
      })
      .addCase(sendCarpoolInvitation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
  },
});

// Exportez les actions et le reducer
export const { setUser } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export const selectStatus = (state) => state.user.status;
export const selectError = (state) => state.user.error;

export default userSlice.reducer;

