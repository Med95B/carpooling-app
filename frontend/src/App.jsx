import {useDispatch} from 'react-redux'
import { useEffect } from 'react';
import { setUser } from './store/userSlice.js';
import Navbar from './components/layout/Navbar.jsx';
import {Outlet} from 'react-router-dom'
import { jwtDecode } from "jwt-decode";
import 'leaflet/dist/leaflet.css'

const App = () => {


  const dispatch = useDispatch();
  const decodeToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded;
    } catch (error) {
      return null;
    }
  };


useEffect(()=>{

  const token = localStorage.getItem('token');
  if (token) {
    const user=decodeToken(token)
    console.log(user);
    dispatch(setUser(user))
  
  }
  
},[dispatch])


  return (
<div>
<Navbar/>
      <h1 className="text-center mt-5">Welcome to CommunityDrive</h1>
      <Outlet/>
   
</div>
    
  );
};

export default App;
