import mongoose from 'mongoose';

const rideSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  departure: {
    name: {
      type: String,
      required: true
    },
    coordinates: {
      type: [Number], // Array of numbers [longitude, latitude]
      required: true
    }
  },
  arrival: {
    name: {
      type: String,
      required: true
    },
    coordinates: {
      type: [Number], // Array of numbers [longitude, latitude]
      required: true
    }
  },
  route: {
    name: String,
    coordinates: [
      {
        lat: Number,
        lng: Number
      }
    ]
  }
});

// Définition des index géospatiaux
rideSchema.index({ 'departure.coordinates': '2dsphere' });
rideSchema.index({ 'arrival.coordinates': '2dsphere' });

const Ride = mongoose.model('Ride', rideSchema);

export default Ride;


