import {FormEvent} from "react";
import {Box, Button, TextField, Typography, Container, Link} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import {useAuth} from "../hooks/useAuth.tsx";

const Login = () => {
    const user = useAuth();
    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget)
        const username = data.get('username')
        const password = data.get('password')
        const host = 'https://test.v5.pryaniky.com' //todo get from env
        const response = await fetch(host + '/ru/data/v3/testmethods/docs/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        const json= await response.json()
        if (json.data) {
            const token = json.data['token']
            user?.login({token: token})
        } else {
            alert("Invalid username or password");
        }
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
                        />

                        <TextField
                            required
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            name={'password'}
                            autoComplete="current-password"
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