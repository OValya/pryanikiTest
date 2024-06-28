import './App.css'
import {Routes, Route} from "react-router-dom"
import Login from "./components/login.tsx";
import Home from "./components/home.tsx";
import AuthProvider from "./hooks/useAuth.tsx";
import PrivateRoute from "./components/privateRoute.tsx";

function App() {
    return (
        <AuthProvider>
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
