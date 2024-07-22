import {Alert, Snackbar} from "@mui/material";

type Props = {
    open: boolean
    message: string
    type: 'error' | 'success'
    handleClose: (_event: React.SyntheticEvent | Event, reason?: string) => void
}


const ErrorComp = ({open, message, type, handleClose}: Props) => {
    return (
        <div>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity={type}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </div>

    );
};

export default ErrorComp;