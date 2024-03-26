import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../config/axiosWithAuth';


// Action asynchrone pour créer un nouveau trajet
export const createRide = createAsyncThunk(
  'rides/create',
  async (rideData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/rides`, rideData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Action asynchrone pour obtenir tous les trajets
export const getAllRides = createAsyncThunk(
  'rides/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/rides`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Action asynchrone pour obtenir un trajet par ID
export const getRideById = createAsyncThunk(
  'rides/getById',
  async (rideId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/rides/${rideId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// Action asynchrone pour obtenir les rides d'un utilisateur
export const getUserRides = createAsyncThunk('rides/getUserRides', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`/user/rides`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Action asynchrone pour supprimer un trajet par ID
export const deleteRideById = createAsyncThunk(
  'rides/deleteById',
  async (rideId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/rides/${rideId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const rideSlice = createSlice({
  name: 'ride',
  initialState: {
    rides: [],
    ride:null,
    status: 'idle',
    error: null,
  },
  reducers: {
 
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRide.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createRide.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.rides.push(action.payload); 
        state.error = null;
      })
      .addCase(createRide.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
      .addCase(getAllRides.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllRides.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.rides = action.payload;
        state.error = null;
      })
      .addCase(getAllRides.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
      .addCase(getRideById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getRideById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.ride=action.payload
        state.error = null;
      })
      .addCase(getRideById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
      .addCase(deleteRideById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteRideById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.rides = state.rides.filter((ride) => ride._id !== action.payload._id); // Supprimer le trajet de la liste
        state.error = null;
      })
      .addCase(deleteRideById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
      .addCase(getUserRides.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserRides.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.rides = action.payload;
        state.error = null;
      })
      .addCase(getUserRides.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
  },
});


export const { setRides } = rideSlice.actions;
export const selectRides = (state) => state.ride.rides;
export const selectRide = (state) => state.ride.ride;
export const selectRidesStatus = (state) => state.ride.status;
export const selectRidesError = (state) => state.ride.error;

export default rideSlice.reducer;
