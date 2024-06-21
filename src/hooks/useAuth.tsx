import {createContext, ReactNode, useContext, useState} from "react";
//import {Navigate} from "react-router-dom";
import {useNavigate} from "react-router-dom";

// interface User {
//     username: string;
//     token: string;
// }

type AuthContextType = {
    token: string;
  //  user: string;
    login:  (data: { token: string }) => void;
    logout: (id: number) => void;
}

const AuthContext = createContext<AuthContextType|null>(null);

type Props ={
    children?:ReactNode
}
const AuthProvider = ({children}:Props) => {
    const navigate = useNavigate()
   // const [user, setUser] = useState('')
    const [token, setToken] = useState(localStorage.getItem('token') || '')


    const login = async (data:{token:string}) => {
       // setUser(data.username)
        setToken(data.token)
        localStorage.setItem('token', data.token)
        navigate("/", {replace:true})
    }

    const logout = () => {
       // setUser('')
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

