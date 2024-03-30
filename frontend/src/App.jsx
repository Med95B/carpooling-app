
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/auth/RegisterForm.jsx';
import LoginForm from './components/auth/LoginForm.jsx';
import Navbar from './components/layout/Navbar.jsx';
import GuestRoute from './components/auth/GuestRoute.jsx';
import UserRole from './components/user/userRole.jsx';
import RideForm from './components/ride/rideForm.jsx';
import PassengerTrip from './components/trip/passengerTrip.jsx';
import DriverTrip from './components/trip/driverTrip.jsx';
import NotFoundPage from './components/auth/NotFoundPage.jsx';
import DetailsTrip from './components/trip/detailsTrip.jsx';
import {useDispatch} from 'react-redux'
import { decodeToken } from './utils/authToken.js';
import { useEffect } from 'react';
import { setUser } from './store/userSlice.js';
import AuthRoute from './components/auth/AuthRoute.jsx';
import UserInvitation from './components/invitation/userInvitations.jsx';

const App = () => {
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
useEffect(()=>{
  dispatch(setUser(decodeToken(token)))
  console.log(decodeToken(token));
},[dispatch,token])

  return (
    <Router>
    <div>
    <Navbar />
      <h1 className="text-center mt-5">Welcome to CommunityDrive</h1>
      <Routes>
        <Route path="/" element={<AuthRoute><LoginForm /></AuthRoute>} />
        <Route path="/register" element={<AuthRoute><RegisterForm /></AuthRoute>} />
        <Route path="/role" element={<GuestRoute><UserRole /></GuestRoute>} />
        <Route path='/ride' element={<GuestRoute><RideForm /></GuestRoute>}/>
        <Route path='/trip/passenger' element={<GuestRoute><PassengerTrip /></GuestRoute>}/>     
        <Route path='/trip/driver' element={<GuestRoute><DriverTrip /></GuestRoute>}/>           
        <Route path='/trip/:id' element={<GuestRoute><DetailsTrip /></GuestRoute>}/>                   
        <Route path='/invitations' element={<GuestRoute>< UserInvitation/></GuestRoute>}/>                          
        <Route path='*' element={<NotFoundPage />}/>                 
      </Routes>
    </div>
  </Router>
  );
};

export default App;
