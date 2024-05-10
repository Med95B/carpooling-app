import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../config/axiosWithAuth';


// Action asynchrone pour l'inscription d'un user
export const registerUser = createAsyncThunk('user/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(`/register`, userData);
    
    return response.data;

  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Action asynchrone pour l'activation d'un user
export const activateUser = createAsyncThunk('user/activate', async (activationToken, { rejectWithValue }) => {
try {
  const response = await axiosInstance.post(`/activation`, activationToken);
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
     // Sauvegarder le token dans le localStorage
     localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

//Méthode pour mettre à jour le profil 
export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/updateProfile`, userData);
      // Sauvegarder le token dans le localStorage
    localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Méthode pour supprimer le compte
export const deleteUser = createAsyncThunk(
  'user/delete',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/deleteUser`);
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
    user: {},
    status: 'idle',
    message:'',
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
      state.message=action.payload.message
      state.error = null;
    })
    .addCase(registerUser.rejected, (state, action) => {
      state.status = 'failed';
      state.message=null
      state.error = action.payload.message;
    })
    .addCase(activateUser.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(activateUser.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.user = action.payload.user;
      state.message=action.payload.message
      state.error = null;
    })
    .addCase(activateUser.rejected, (state, action) => {
      state.status = 'failed';
      state.message=null
      state.error = action.payload.message;
    })
    .addCase(loginUser.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.user = action.payload.user;
      state.message=action.payload.message
      state.error = null;
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.status = 'failed';
      state.message=null
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
      .addCase(updateUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.message=action.payload.message
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.status = 'succeeded';
        state.user = null; 
        state.error = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
  },
});


export const { setUser } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export const selectStatus = (state) => state.user.status;
export const selectError = (state) => state.user.error;
export const selectMessage=(state) => state.user.message
export default userSlice.reducer;

