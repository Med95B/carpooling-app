import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, selectStatus, selectError } from '../../store/userSlice.js';
import { Link ,useNavigate} from 'react-router-dom';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const navigate=useNavigate()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender:'',
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
      const res = await dispatch(registerUser(dataToSend));
      if (res.payload) {
        navigate('/ride'); 
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
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
          <label htmlFor="gender" className="form-label">Gender</label>
          <select className="form-select" id="gender" name="gender" value={formData.gender} onChange={handleChange}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="mb-3">
          <input type="password" className="form-control" name="password" placeholder="Password" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <input type="password" className="form-control" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
      <Link to="/">Already have an account? Login</Link>
      {status === 'failed' && (
        <div className="alert alert-danger mt-5" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
