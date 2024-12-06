import { Box, Typography, Button } from "@mui/material";

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
                direction: 'rtl', // Set text direction to right-to-left for Hebrew
            }}
        >
            <Typography variant="h4" component="h1" gutterBottom>
                אופס! הדף שאתה מחפש לא קיים.
            </Typography>
            <Box
                component="iframe"
                width="560"
                height="315"
                src="https://www.youtube.com/embed/t3otBjVZzT0?autoplay=true"
                allow="autoplay"
                title="Page not Found"
                sx={{
                    border: 'none',
                    mb: 2, // marginBottom is converted to sx shorthand
                }}
            ></Box>
            <Button variant="contained" color="primary" onClick={() => window.location.href = '/'}>
                חזור לדף הבית
            </Button>
        </Box>
    );
}

export default Page404;
