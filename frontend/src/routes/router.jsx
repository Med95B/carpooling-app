import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFoundPage from "../components/auth/NotFoundPage";


export const router=createBrowserRouter([
    {
        element:<App/>,
        children:[
            {
                path:'*',
                element: <NotFoundPage/> 
             },
        ]
           
        
    }
])