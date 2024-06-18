import {createContext, ReactNode, useContext, useState} from "react";
//import {Navigate} from "react-router-dom";
import {useNavigate} from "react-router-dom";

type AuthContextType = {
    token: string;
    user: string;
    login:  (data:string) => void;
    logout: (id: number) => void;
}

const AuthContext = createContext<AuthContextType|null>(null);

type Props ={
    children?:ReactNode
}
const AuthProvider = ({children}:Props) => {
    const navigate = useNavigate()
    const [user, setUser] = useState('')
    const [token, setToken] = useState('')


    const login = async (data:string) => {
        console.log('login data', data)
        setUser(data)
        setToken(data)
        console.log('auth login')

        navigate("/", {replace:true})
    }

    const logout = () => {
        setUser('')
        setToken('')

    }

    return <AuthContext.Provider value={{user, token, login, logout}}>
        {children}
    </AuthContext.Provider>
}

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};

