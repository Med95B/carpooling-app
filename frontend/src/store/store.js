import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice.js';
import rideReducer from './rideSlice.js'

const store = configureStore({
  reducer: {
    user: userReducer,
    ride: rideReducer
  },
});

export default store;
