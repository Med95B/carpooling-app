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
  isDriver: {
    type: Boolean,
    default: false
  },
  vehicleInfo: {
    make: String,
    model: String,
    year: Number,
    // Les images du conducteur et du véhicule
    driverLicenseImage: String,
    vehicleRegistrationImage: String,
    vehicleInsuranceImage: String,
    vehicleImage: String
  }

}, 
{
  timestamps:true
}
);

const User = mongoose.model('User', userSchema);

export default User;
