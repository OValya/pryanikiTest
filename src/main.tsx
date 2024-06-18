// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
// import Login from "./components/login.tsx";
// import Registration from "./components/registration.tsx";
//import AuthProvider from "./hooks/useAuth.tsx";
// import PrivateRoute from "./components/privateRoute.tsx";
//import AuthProvider from "./hooks/useAuth.tsx";



// const router = createBrowserRouter([
//     {   path: "/",
//         element: <PrivateRoute />,
//         children: [
//             {
//                 path: "about",
//                 element: <h1>protected</h1>,
//             }
//             ]
//     },
//
//     {   path:"login",
//         element:<Login/>
//     },
//     {
//         path:"registration",
//         element:<Registration/>
//     }
// ]);

ReactDOM.createRoot(document.getElementById('root')!).render(

    <BrowserRouter>
        <App/>
    </BrowserRouter>
    // <AuthProvider>
    //     <RouterProvider router={router} />
    // </AuthProvider>



  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
)
