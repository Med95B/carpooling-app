import mongoose from 'mongoose';

const rideSchema = new mongoose.Schema({
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  date: Date, // Date du trajet
  time: String, // Heure de départ
  seatsAvailable: {
    type: Number,
    required: true
  },
  // Autres champs selon vos besoins
});

const Ride = mongoose.model('Ride', rideSchema);

export default Ride;
