import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../config/axiosWithAuth';

const baseURL = '/vehicles';

//  creer un vehicule
export const createVehicle = createAsyncThunk(
  'vehicles/create',
  async (vehicleData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(baseURL, vehicleData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// obtenir les vehicules d'un user
export const getUserVehicles = createAsyncThunk(
  'vehicles/getUserVehicles',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(baseURL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// update un vehicule
export const updateVehicle = createAsyncThunk(
  'vehicles/update',
  async ({ id, vehicleData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`${baseURL}/${id}`, vehicleData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//  supprimer un vehicule
export const deleteVehicle = createAsyncThunk(
  'vehicles/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`${baseURL}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState: {
    vehicles: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    clearStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createVehicle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createVehicle.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.vehicles.push(action.payload);
        state.error = null;
      })
      .addCase(createVehicle.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
      .addCase(getUserVehicles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserVehicles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.vehicles = action.payload;
        state.error = null;
      })
      .addCase(getUserVehicles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
      .addCase(updateVehicle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateVehicle.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedIndex = state.vehicles.findIndex((vehicle) => vehicle._id === action.payload._id);
        if (updatedIndex !== -1) {
          state.vehicles[updatedIndex] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateVehicle.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
      .addCase(deleteVehicle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteVehicle.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.vehicles = state.vehicles.filter((vehicle) => vehicle._id !== action.payload);
        state.error = null;
      })
      .addCase(deleteVehicle.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
  },
});

export const { clearStatus } = vehicleSlice.actions;
export const selectVehicles = (state) => state.vehicle.vehicles;
export const selectVehiclesStatus = (state) => state.vehicle.status;
export const selectVehiclesError = (state) => state.vehicle.error;

export default vehicleSlice.reducer;
