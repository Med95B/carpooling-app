import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import GuestRoute from "../components/auth/GuestRoute.jsx";
import AuthRoute from "../components/auth/AuthRoute.jsx";
import UserInvitation from '../components/invitation/userInvitations.jsx';
import RegisterForm from '../components/auth/RegisterForm.jsx';
import LoginForm from '../components/auth/LoginForm.jsx';
import UserRole from '../components/user/userRole.jsx';
import RideForm from '../components/ride/rideForm.jsx';
import PassengerTrip from '../components/trip/passengerTrip.jsx';
import DriverTrip from '../components/trip/driverTrip.jsx';
import NotFoundPage from '../components/auth/NotFoundPage.jsx';
import DetailsTrip from '../components/trip/detailsTrip.jsx';
import Profile from "../components/user/profile.jsx";


export const router=createBrowserRouter([
    {
        element:<App/>,
        children:[
            {
                path:'/',
                element: <GuestRoute><LoginForm /></GuestRoute> 
             },
             {
                path:'/register',
                element: <GuestRoute><RegisterForm /></GuestRoute> 
             },
             {
                path:'/profile',
                element:<AuthRoute><Profile /></AuthRoute>
             },
             {
                path:'/role',
                element: <AuthRoute><UserRole /></AuthRoute> 
             },
             {
                path:'/ride',
                element: <AuthRoute><RideForm /></AuthRoute>
             },
             {
                path:'/trip/passenger',
                element: <AuthRoute><PassengerTrip /></AuthRoute>
             },
            {
                path:'/trip/driver',
                element: <AuthRoute><DriverTrip /></AuthRoute>
             },
             {
                path:'/trip/:id',
                element: <AuthRoute><DetailsTrip /></AuthRoute>
             },
             {
                path:'/invitations',
                element: <AuthRoute>< UserInvitation/></AuthRoute> 
             },
             {
                path:'*',
                element: <NotFoundPage /> 
             },
        ]
           
        
    }
])