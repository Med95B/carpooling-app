import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, selectStatus, selectError } from '../../store/userSlice.js';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    role: 'passenger', // Par défaut passenger, peut être modifié
    vehicleInfo: {} // Les informations du véhicule peuvent être ajoutées ici
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      {status === 'failed' && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input type="text" className="form-control" name="firstName" placeholder="First Name" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <input type="text" className="form-control" name="lastName" placeholder="Last Name" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <input type="email" className="form-control" name="email" placeholder="Email" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <input type="text" className="form-control" name="phone" placeholder="Phone" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <input type="password" className="form-control" name="password" placeholder="Password" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <select className="form-control" name="role" onChange={handleChange}>
            <option value="passenger">Passenger</option>
            <option value="driver">Driver</option>
          </select>
        </div>
        {/* D'autres champs pour les informations du véhicule, si nécessaire */}
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
      <Link to="/">Already have an account? Login</Link>
    </div>
  );
};

export default RegisterForm;
