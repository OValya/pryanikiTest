import {
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from "@mui/material";
import {DataTable} from "./dataGridComp.tsx";

interface Props  {
    open:boolean;
    onClose: (value:DataTable | null) => void;
    value:DataTable|null;
}
const ModalComp = ({open, onClose, value}:Props) => {
    const handleClose = () => {
        onClose(null);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        formJson.companySigDate = new Date(formJson.companySigDate as string).toISOString();
        formJson.employeeSigDate = new Date(formJson.employeeSigDate as string).toISOString();
        formJson.id = value?.id || '';
        //console.log(formJson);
        onClose(formJson as unknown as DataTable);
    }

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
                    defaultValue={value?.documentType}
                    variant="standard"
                />
                <TextField
                    required
                    margin="dense"
                    name="documentName"
                    label="Document Name"
                    fullWidth
                    defaultValue={value?.documentName}
                    variant="standard"
                />
                <TextField
                    required
                    margin="dense"
                    name="documentStatus"
                    label="Document Status"
                    fullWidth
                    defaultValue={value?.documentStatus}
                    variant="standard"
                />
                <TextField
                    required
                    type='date'
                    margin="dense"
                    name="companySigDate"
                    label="Company Signature Date"
                    fullWidth
                    defaultValue={value?.companySigDate? value?.companySigDate?.split('T')[0] : new Date().toISOString().split('T')[0]}
                    variant="outlined"
                />
                <TextField
                    required
                    margin="dense"
                    name="companySignatureName"
                    label="Company Signature Name"
                    fullWidth
                    defaultValue={value?.companySignatureName}
                    variant="standard"
                />
                <TextField
                    required
                    margin="dense"
                    name="employeeNumber"
                    label="Employee Number"
                    fullWidth
                    defaultValue={value?.employeeNumber}
                    variant="standard"
                />
                <TextField
                    required
                    type='date'
                    margin="dense"
                    name="employeeSigDate"
                    label="Employee Signature Date"
                    fullWidth
                    defaultValue={value?.employeeSigDate? value?.employeeSigDate?.split('T')[0] : new Date().toISOString().split('T')[0]}
                    variant="outlined"
                />
                <TextField
                    required
                    margin="dense"
                    name="employeeSignatureName"
                    label="Employee Signature Name"
                    fullWidth
                    defaultValue={value?.employeeSignatureName}
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button
                    type="submit"
                >
                    Save
                </Button>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalComp;