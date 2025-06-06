/* eslint-disable react/prop-types */
import{ Navigate }from'react-router-dom';

const AuthRoute =({children})=>{
    
    const token=localStorage.getItem('token')
    return token ? children : <Navigate to="/"/>;
};
export default AuthRoute
