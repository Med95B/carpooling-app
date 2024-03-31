/* eslint-disable react/prop-types */
import{ Navigate }from'react-router-dom';

const GuestRoute =({children})=>{
    
    const token=localStorage.getItem('token')
    return !token ? children : <Navigate to="/role"/>;
};
export default GuestRoute