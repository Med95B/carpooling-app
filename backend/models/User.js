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
  gender: {
    type: String,
    enum:['male','female'],
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
  photo: {
    type: String,
    default:''
  },
  idCardR: {
    type: String,
    default:''
  },
  idCardV: {
    type: String,
    default:''
  },
  password: {
    type: String,
    required: true,
    minLength:6
  },
  isDriver: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;
