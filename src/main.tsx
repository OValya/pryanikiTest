// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";


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

)
