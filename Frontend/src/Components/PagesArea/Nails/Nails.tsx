import { Box, Typography } from '@mui/material';

export function Nails(): JSX.Element {
  return (
    <Box
      sx={{
        height: '100vh',
        backgroundImage: `url("/images/nailspage1.jpg")`, // Replace with the correct path
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
עמידה על מסמרים      </Typography>
      <Typography variant="h6" sx={{ mb: 4, maxWidth: '600px' }}>
        גלו את אומנות היציבות והחיבור לאדמה באמצעות טכניקות עתיקות. 
        מסמרי סדהו יכולות ללמד אותנו איזון, עמידות וכוח של ריכוז.
      </Typography>
    </Box>
  );
}
