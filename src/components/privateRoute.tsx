import {Navigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth.tsx";
import {ReactNode} from "react";

type Props ={
    children?:ReactNode
}
const PrivateRoute = ({children}:Props) => {
    const user = useAuth();
    return user?.token ? children : <Navigate to={"/pryanikiTest/login"}/>
};

export default PrivateRoute;