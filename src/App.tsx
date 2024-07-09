import './App.css'
import {Routes, Route} from "react-router-dom"
import Login from "./components/login.tsx";
import Home from "./components/home.tsx";
import AuthProvider from "./hooks/useAuth.tsx";
import PrivateRoute from "./components/privateRoute.tsx";
import BarComp from "./components/barComp.tsx";

function App() {
    return (
        <AuthProvider>
            <BarComp/>
            <Routes>
                <Route path="/"
                       element={
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>}
                />
                <Route path="/login" element={<Login />} />
            </Routes>
        </AuthProvider>
    );
}

export default App
