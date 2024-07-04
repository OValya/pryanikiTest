import {
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from "@mui/material";
//import {useState} from "react";
import {DataTable} from "./dataGridComp.tsx";

interface Props  {
    open:boolean;
    onClose: (value:DataTable | null) => void;
    // value:string;
}
const ModalComp = ({open, onClose}:Props) => {
    const handleClose = () => {
        onClose(null);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const formJson:DataTable = Object.fromEntries(formData.entries());
        formJson.companySigDate = new Date(formJson.companySigDate as string).toISOString();
        formJson.employeeSigDate = new Date(formJson.employeeSigDate as string).toISOString();
        console.log(formJson);
        onClose(formJson);
        //setData(formJson);
        //handleClose();
    }

    //const [data, setData] = useState<DataTable|null>(null)
    // const style = {
    //     position: 'absolute' as 'absolute',
    //     top: '50%',
    //     left: '50%',
    //     transform: 'translate(-50%, -50%)',
    //     width: 400,
    //     bgcolor: 'background.paper',
    //     border: '2px solid #000',
    //     boxShadow: 24,
    //     p: 4,
    // }
    return (
        <Dialog open={open}
                onClose={handleClose}
                PaperProps={{
                        component: 'form',
                        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                            handleSubmit(event)
                        },
                    }}
        >
            <DialogTitle>Enter Data</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    name="documentType"
                    label="Document Type"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    required
                    margin="dense"
                    name="documentName"
                    label="Document Name"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    required
                    margin="dense"
                    name="documentStatus"
                    label="Document Status"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    required
                    type='date'
                    margin="dense"
                    name="companySigDate"
                    label="Company Signature Date"
                    fullWidth
                    variant="outlined"
                />
                <TextField
                    required
                    margin="dense"
                    name="companySignatureName"
                    label="Company Signature Name"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    required
                    margin="dense"
                    name="employeeNumber"
                    label="Employee Number"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    required
                    type='date'
                    margin="dense"
                    name="employeeSigDate"
                    label="Employee Signature Date"
                    fullWidth
                    variant="outlined"
                />
                <TextField
                    required
                    margin="dense"
                    name="employeeSignatureName"
                    label="Employee Signature Name"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button
                    type="submit"
                    // fullWidth
                    // variant="contained"
                    // sx={{mt: 3, mb: 2}}
                >
                    Save
                </Button>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
            {/*<Box sx={style}>*/}
            {/*    <Typography id="modal-modal-title" variant="h6" component="h2">*/}
            {/*        Enter data*/}
            {/*    </Typography>*/}
            {/*    <form onSubmit={handleClose}>*/}



            {/*    </form>*/}

            {/*</Box>*/}
        </Dialog>
    );
};

export default ModalComp;