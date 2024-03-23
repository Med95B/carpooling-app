import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['driver', 'passenger'],
    default: 'passenger'
  },
  vehicleInfo: {
    // Informations sur le véhicule du conducteur
    type: {
      make: String,
      model: String,
      year: Number
    },
    required: function() {
      return this.role === 'driver';
    }
  },
  // Autres champs selon vos besoins
});

const User = mongoose.model('User', userSchema);

export default User;
