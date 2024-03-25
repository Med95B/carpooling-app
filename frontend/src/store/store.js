import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice.js';
import rideReducer from './rideSlice.js'
import tripReducer from './tripSlice.js'
import vehicleReducer from './vehicleSlice.js'

const store = configureStore({
  reducer: {
    user: userReducer,
    ride: rideReducer,
    trip:tripReducer,
    vehicle:vehicleReducer
  },
});

export default store;
