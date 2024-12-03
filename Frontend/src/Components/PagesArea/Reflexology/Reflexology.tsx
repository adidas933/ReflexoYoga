import { Box, Typography } from '@mui/material';

export function Reflexology(): JSX.Element {
  return (
    <Box
      sx={{
        height: '100vh',
        backgroundImage: `url("/images/reflexology.jpg")`, // Replace with your image path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: 'white',
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)',
        px: 2,
        direction: 'rtl', // Right-to-left layout for Hebrew
      }}
    >
      <Typography variant="h3" sx={{ mb: 2 }}>
        רפלקסולוגיה
      </Typography>
      <Typography variant="h6" sx={{ mb: 4, maxWidth: '600px' }}>
        גלו את אמנות הרפלקסולוגיה העתיקה, שבה כל חלק בגוף שלכם מקושר זה לזה. 
        חוו את כוח הריפוי של המגע להחיות את נפשכם, גופכם ורוחכם.
      </Typography>
    </Box>
  );
}
