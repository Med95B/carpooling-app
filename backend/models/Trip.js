import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  ride: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ride',
    required: true
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  passengers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  singleTrip: {
   
    date: Date,
    time: String
  },
  dailyTrip: {
    
    startTime: String,
    endTime: String,
    days: [{
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }]
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle'
  },
  status: {
    type: String,
    enum: [null,'ongoing', 'completed', 'canceled'],
    default: null
  }
  
});

const Trip = mongoose.model('Trip', tripSchema);

export default Trip;
