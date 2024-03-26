import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../config/axiosWithAuth';


// créer un nouveau trip
export const createTrip = createAsyncThunk(
  'trips/create',
  async (tripData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/trips`, tripData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//  obtenir tous les trips
export const getAllTrips = createAsyncThunk(
  'trips/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/trips`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// obtenir un trip par ID
export const getTripById = createAsyncThunk(
  'trips/getById',
  async (tripId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/trips/${tripId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// supprimer un trip par ID
export const deleteTripById = createAsyncThunk(
  'trips/deleteById',
  async (tripId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/trips/${tripId}`);
      return tripId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const tripSlice = createSlice({
  name: 'trip',
  initialState: {
    trips: [],
    trip: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTrip.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createTrip.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.trips.push(action.payload);
        state.error = null;
      })
      .addCase(createTrip.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
      .addCase(getAllTrips.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllTrips.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.trips = action.payload;
        state.error = null;
      })
      .addCase(getAllTrips.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
      .addCase(getTripById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTripById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.trip = action.payload;
        state.error = null;
      })
      .addCase(getTripById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
      .addCase(deleteTripById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteTripById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.trips = state.trips.filter((trip) => trip._id !== action.payload);
        state.error = null;
      })
      .addCase(deleteTripById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
  },
});

export const selectTrips = (state) => state.trip.trips;
export const selectTrip = (state) => state.trip.trip;
export const selectTripsStatus = (state) => state.trip.status;
export const selectTripsError = (state) => state.trip.error;

export default tripSlice.reducer;
