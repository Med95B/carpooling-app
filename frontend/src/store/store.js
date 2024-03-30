import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice.js';
import rideReducer from './rideSlice.js'
import tripReducer from './tripSlice.js'
import vehicleReducer from './vehicleSlice.js'
import invitationReducer from './invitationSlice.js'

const store = configureStore({
  reducer: {
    user: userReducer,
    ride: rideReducer,
    trip:tripReducer,
    vehicle:vehicleReducer,
    invitation:invitationReducer
  },
});

export default store;
