import {FormEvent} from "react";
import {Box, Button, TextField, Typography, Container, Link} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import {useAuth} from "../hooks/useAuth.tsx";

const Login = () => {
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const user = useAuth();
    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget)
        const email = data.get('email')
        const password = data.get('password')
        if (email === "user" && password === "password") {
            // todo сделать аутентификацию
            console.log('login auth data', user)
            user?.login('all work!');
        } else {
            alert("Invalid username or password");
        }
        // console.log(
        //     {
        //         email: data.get('email'),
        //         password:data.get('password')
        //     }
        // )
    }

    return (

            <Container component={"main"} maxWidth="xs">
                <Box component={"form"}
                     onSubmit={handleSubmit}
                     sx={{marginTop:'60px', display:'flex',
                    flexDirection:'column',
                    gap:'20px'
                }}
                >
                    <Typography component={"h1"} variant={'h4'}>Please, sign in</Typography>

                        <TextField
                            required
                            id="outlined-email-input"
                            name={'email'}
                            label="E-mail"
                            // value={email}
                            // onChange={(e)=>setEmail(e.target.value)}
                        />

                        <TextField
                            required
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            name={'password'}
                            autoComplete="current-password"
                            // value={password}
                            // onChange={(e)=>{setPassword(e.target.value)}}
                        />
                        <Button type="submit" variant="contained">Sign in</Button>

                    <Typography component={"p"}>
                        {"Don't have an account?"}
                        <Link component={RouterLink} variant="body2" to={"/registration"}>
                            {"Sign Up"}
                        </Link>
                    </Typography>
                </Box>
            </Container>
    );
};

export default Login;