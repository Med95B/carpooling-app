import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import { Provider } from 'react-redux';
import store from './store/store.js';
import {RouterProvider} from 'react-router-dom'
import { router } from './routes/router.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
