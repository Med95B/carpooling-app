import {useDispatch} from 'react-redux'
import { jwtDecode } from "jwt-decode";
import { useEffect } from 'react';
import { setUser } from './store/userSlice.js';
import Navbar from './components/layout/Navbar.jsx';
import {Outlet} from 'react-router-dom'


const App = () => {


  const token = localStorage.getItem('token');
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
  dispatch(setUser(decodeToken(token)))
},[dispatch,token])


  return (
    <div>
      <Navbar/>
      <h1 className="text-center mt-5">Welcome to CommunityDrive</h1>
      <Outlet/>
    </div>
  );
};

export default App;
