/* eslint-disable react/prop-types */
import{ Navigate }from'react-router-dom';
//import { useSelector } from 'react-redux';
//import { selectUser } from '../../store/userSlice.js';

const ProtectedRoute =({children})=>{
    //const user = useSelector(selectUser);
    const token=localStorage.getItem('token')
    return token ? children : <Navigate to="/"/>;
};
export default ProtectedRoute
