import {Alert, Snackbar} from "@mui/material";
import {MessageType} from "./dataGridComp.tsx";

type Props = {
    open: boolean
    message: string
    type: 'error' | 'success'
    handleClose: (event: React.SyntheticEvent | Event, reason?: string) => void
}


const ErrorComp = ({open, message, type, handleClose}: Props) => {
    // const [openState, setOpenState] = useState(open);
    // const handleClose = () => {
    //     setOpenState(false)
    // }
    return (
        <div>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                {/*onClose={handleClose}>*/}
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