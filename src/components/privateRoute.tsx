import {Navigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth.tsx";
import {ReactNode} from "react";

type Props ={
    children?:ReactNode
}
const PrivateRoute = ({children}:Props) => {
    const user = useAuth();
   // console.log('private', user?.token)
   //  const token = localStorage.getItem('token')
   //  if(token){
   //      user?.login({token: token})
   //  }
    return user?.token ? children : <Navigate to={"/login"}/>
};

export default PrivateRoute;