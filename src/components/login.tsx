import {FormEvent, useState} from "react";
import {Box, Button, TextField, Typography, Container, Alert} from "@mui/material";
import {useAuth} from "../hooks/useAuth.tsx";
import Loader from "./loader.tsx";

const Login = () => {
    const user = useAuth();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
        const data = new FormData(e.currentTarget)
        const username = data.get('username')
        const password = data.get('password')
        const host = import.meta.env.VITE_HOST
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
        const json = await response.json()
        setLoading(false)
        if (json.data) {
            const token = json.data['token']

            user?.login({token: token})
        } else {
            setError(json.error_text)

        }
    }

    return (

        <Container component={"main"} maxWidth="xs">
            {loading && <Loader />}
            <Box component={"form"}
                 onSubmit={handleSubmit}
                 sx={{
                     marginTop: '120px', display: 'flex',
                     flexDirection: 'column',
                     gap: '20px'
                 }}
            >
                <Typography component={"h1"} variant={'h4'}>Please, sign in</Typography>

                {error && <Alert variant="outlined" severity="error">
                    Error occurred: {error}. <br/> Check your e-mail and password.
                </Alert>}
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
                    {"Don't have an account? Use 'user13' and 'password'"}
                </Typography>
            </Box>
        </Container>
    );
};

export default Login;