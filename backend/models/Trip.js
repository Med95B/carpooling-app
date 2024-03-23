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
    required: true
  },
  passengers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  singleTrip: {
    // Informations pour un trajet unique
    date: Date,
    time: String
  },
  dailyTrip: {
    // Informations pour un trajet récurrent (chaque jour)
    startTime: String,
    endTime: String,
    days: [{
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }]
  },
  // Autres champs selon vos besoins
});

const Trip = mongoose.model('Trip', tripSchema);

export default Trip;
