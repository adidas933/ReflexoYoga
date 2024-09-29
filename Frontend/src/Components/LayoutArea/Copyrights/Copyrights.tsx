import { Typography, Box } from "@mui/material";
import "./Copyrights.css";

function Copyrights(): JSX.Element {
    return (
        <Box 
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 2,
                backgroundColor: 'background.default', // or any desired color
                color: 'text.secondary', // or any desired text color
                borderTop: '1px solid',
                borderColor: 'divider',
            }}
        >
            <Typography variant="body2">
                All Rights Reserved ©
            </Typography>
        </Box>
    );
}

export default Copyrights;
