// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter,  RouterProvider} from "react-router-dom";
import Login from "./components/login.tsx";
import Registration from "./components/registration.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element:<App/>,
    },
    {
        path: "about",
        element: <div>About</div>,
    },
    {   path:"login",
        element:<Login/>
    },
    {
        path:"registration",
        element:<Registration/>
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
)
