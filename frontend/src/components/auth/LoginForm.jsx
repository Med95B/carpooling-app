import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, selectStatus, selectError } from '../../store/userSlice.js';
import { Link,useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(loginUser(formData));
      if (res.payload) {
        navigate('/ride'); 
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input type="email" className="form-control" name="email" placeholder="Email" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <input type="password" className="form-control" name="password" placeholder="Password" onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      <Link to="/register">Don&apos;t have an account? Register</Link>
      {status === 'failed' && (
        <div className="alert alert-danger mt-5" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default LoginForm;
