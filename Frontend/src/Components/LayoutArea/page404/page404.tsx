import { Box, Typography, Button } from "@mui/material";
import "./page404.css";

function Page404(): JSX.Element {
    return (
        <Box
            className="page404"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                textAlign: 'center',
                padding: 2,
            }}
        >
            <Typography variant="h4" component="h1" gutterBottom>
                Oops! The page you are looking for doesn't exist.
            </Typography>
            <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/t3otBjVZzT0?autoplay=true"
                allow="autoplay"
                title="Page not Found"
                style={{ border: 'none', marginBottom: '20px' }}
            ></iframe>
            <Button variant="contained" color="primary" onClick={() => window.location.href = '/'}>
                Go Back Home
            </Button>
        </Box>
    );
}

export default Page404;
