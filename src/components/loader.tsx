import {CircularProgress, Box} from "@mui/material";


const Loader = () => {
    const styles = {
        position:'absolute',
        left:0,
        top:0,
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999
    }
    return (
        <Box sx={{...styles}}>
            <CircularProgress/>
        </Box>
    );
};

export default Loader;