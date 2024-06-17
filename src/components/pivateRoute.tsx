import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../hooks/useAuth.tsx";


const PivateRoute = () => {
    const user = useAuth();
    if(!user?.user) return <Navigate to={"/login"}/>
    return <Outlet/>;
};

export default PivateRoute;