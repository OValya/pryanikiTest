import {FormEvent} from "react";
import {Box, Button, TextField, Typography, Container, Link} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";

const Login = () => {
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget)
        console.log(
            {
                email: data.get('email'),
                password:data.get('password')
            }
        )
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