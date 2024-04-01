import {useDispatch} from 'react-redux'
import { useEffect } from 'react';
import { setUser } from './store/userSlice.js';
import Navbar from './components/layout/Navbar.jsx';
import {Outlet} from 'react-router-dom'
import decodeToken from './utils/decodeToken.js';

const App = () => {


  const token = localStorage.getItem('token');
  const dispatch = useDispatch();


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
