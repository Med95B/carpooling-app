import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice.js';
import rideReducer from './rideSlice.js'
import tripReducer from './tripSlice.js'

const store = configureStore({
  reducer: {
    user: userReducer,
    ride: rideReducer,
    trip:tripReducer
  },
});

export default store;
