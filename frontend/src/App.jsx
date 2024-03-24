
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/auth/RegisterForm.jsx';
import LoginForm from './components/auth/LoginForm.jsx';
import Navbar from './components/layout/Navbar.jsx';
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';
import UserRole from './components/user/userRole.jsx';
import RideForm from './components/ride/rideForm.jsx';
import PassengerTripForm from './components/trip/passengerTripForm.jsx';

const App = () => {

  return (
    <Router>
    <div>
    <Navbar />
      <h1 className="text-center mt-5">Welcome to My Carpooling App</h1>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/role" element={<ProtectedRoute><UserRole /></ProtectedRoute>} />
        <Route path='/ride' element={<ProtectedRoute><RideForm /></ProtectedRoute>}/>
        <Route path='/trip/passenger' element={<ProtectedRoute><PassengerTripForm /></ProtectedRoute>}/>     
      </Routes>
    </div>
  </Router>
  );
};

export default App;
