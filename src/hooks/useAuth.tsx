import {createContext, ReactNode, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";

type AuthContextType = {
    token: string;
    login:  (data: { token: string }) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType|null>(null);

type Props ={
    children?:ReactNode
}
const AuthProvider = ({children}:Props) => {
    const navigate = useNavigate()
    const [token, setToken] = useState(localStorage.getItem('token') || '')


    const login = async (data:{token:string}) => {
        setToken(data.token)
        localStorage.setItem('token', data.token)
        navigate("/", {replace:true})
    }

    const logout = () => {
        setToken('')
        localStorage.removeItem('token')
    }

    return <AuthContext.Provider value={{ token, login, logout}}>
        {children}
    </AuthContext.Provider>
}

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};

