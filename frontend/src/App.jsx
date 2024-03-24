
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/auth/RegisterForm.jsx';
import LoginForm from './components/auth/LoginForm.jsx';
import Navbar from './components/layout/Navbar.jsx';
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';
import UserRole from './components/user/userRole.jsx';
import PassengerForm from './components/user/passengerForm.jsx';
import {useDispatch } from 'react-redux'
import { setUser } from './store/userSlice.js';
import {jwtDecode } from 'jwt-decode'
import { useEffect } from 'react';

const App = () => {

  const dispatch=useDispatch()

  //solution du user undefined l'hors du rerender
  useEffect(()=>{
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode (token);
      dispatch(setUser(decodedToken));
    }
  })

  return (
    <Router>
    <div>
    <Navbar />
      <h1 className="text-center mt-5">Welcome to My Carpooling App</h1>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/role" element={<ProtectedRoute><UserRole /></ProtectedRoute>} />
        <Route path='/passenger' element={<ProtectedRoute><PassengerForm /></ProtectedRoute>}/>
      </Routes>
    </div>
  </Router>
  );
};

export default App;
