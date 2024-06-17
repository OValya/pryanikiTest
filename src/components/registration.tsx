import {FormEvent} from "react";
import {Box, Button, TextField, Typography, Container, Link} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";

const Registration = () => {
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget)
        console.log(
            {
                name: data.get('name'),
                email: data.get('email'),
                password:data.get('password')
            }
        )
    }

    return (

        <Container component={"main"} maxWidth="xs">
            <Box component={"form"}
                 onSubmit={handleSubmit}
                 sx={{
                     marginTop: 8,
                     display: 'flex',
                     flexDirection: 'column',
                     gap:'20px'
            }}
            >
            <Typography component={"h1"} variant="h4">Please, sign up</Typography>

                <TextField

                    required
                    id="outlined-name-input"
                    name={'name'}
                    label="Your name"
                    // value={email}
                    // onChange={(e)=>setEmail(e.target.value)}
                />
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
                <Button fullWidth type="submit" variant="contained">Sign up</Button>

            <Typography component={"p"}>Already have an account?
                <Link component={RouterLink} to={"/login"} variant="body2">
                     Sign in
                </Link>
            </Typography>
            </Box>
        </Container>
    );
};

export default Registration;