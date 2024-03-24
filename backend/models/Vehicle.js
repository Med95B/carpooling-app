import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  driverLicenseImage: {
    type: String,
    required: true
  },
  vehicleRegistrationImage: {
    type: String,
    required: true
  },
  vehicleInsuranceImage: {
    type: String,
    required: true
  },
  vehicleImage: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

export default Vehicle;
