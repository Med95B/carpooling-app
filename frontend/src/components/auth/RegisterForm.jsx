import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, selectStatus, selectError,selectMessage } from '../../store/userSlice.js';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
const message=useSelector(selectMessage)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender:'male',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return;
    }
    // eslint-disable-next-line no-unused-vars
    const { confirmPassword, ...dataToSend } = formData;
    try {
      await dispatch(registerUser(dataToSend));
    
    } catch (error) {
      console.error(error);
    }
    setFormData({
      firstName: '',
      lastName: '',
      gender:'male',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    })
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input type="text" className="form-control" name="firstName" placeholder="First Name" onChange={handleChange} 
          value={formData.firstName}
          />
        </div>
        <div className="mb-3">
          <input type="text" className="form-control" name="lastName" placeholder="Last Name" onChange={handleChange} 
          value={formData.lastName}
          />
        </div>
        <div className="mb-3">
          <input type="email" className="form-control" name="email" placeholder="Email" onChange={handleChange} 
          value={formData.email}
          />
        </div>
        <div className="mb-3">
          <input type="text" className="form-control" name="phone" placeholder="Phone" onChange={handleChange} 
          value={formData.phone}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">Gender</label>
          <select className="form-select" id="gender" name="gender" value={formData.gender} onChange={handleChange}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="mb-3">
          <input type="password" className="form-control" name="password" placeholder="Password" onChange={handleChange} 
          value={formData.password}
          />
        </div>
        <div className="mb-3">
          <input type="password" className="form-control" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} 
          value={formData.confirmPassword}
          />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
      <Link to="/">Already have an account? Login</Link>
      {status === 'failed' && (
        <div className="alert alert-danger mt-5" role="alert">
          {error}
        </div>
      )}
        {status === 'succeeded' && (
        <div className="alert alert-info alert-dismissible fade show mt-5" role="alert">
          {message}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
