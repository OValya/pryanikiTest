import {AppBar, Button, Toolbar, Typography} from "@mui/material";

import {useAuth} from "../hooks/useAuth.tsx";
import {useNavigate} from "react-router-dom";

const BarComp = () => {
    const user = useAuth();
    const navigate = useNavigate();
    const logout = () => {
        user?.logout();
    }
    const handleLoginButtonClick = () => {
        if (user?.token) {
            logout();
        }
        else {
            navigate('/login')
        }
    }
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    Pryaniki Test
                </Typography>

                <Button onClick={handleLoginButtonClick} color="inherit">{user?.token? "Logout" : "Login"}</Button>
            </Toolbar>
        </AppBar>


    );
};

export default BarComp;