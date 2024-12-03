import { Box, Typography, Button, Grid } from '@mui/material';

export function Beginners(): JSX.Element {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url("/images/beginners-bg.jpg")`, // Replace with your image path
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
        py: 4,
        direction: 'rtl', // Added for right-to-left layout
      }}
    >
      <Typography variant="h2" sx={{ mb: 2 }}>
        מדריך למתחילים לרווחה
      </Typography>
      <Typography variant="h6" sx={{ mb: 4, maxWidth: '600px' }}>
        בין אם אתה רק מתחיל או מחפש להעמיק את הידע שלך, מדריך זה יעזור לך להתחיל את המסע  שלך.
      </Typography>
      
      {/* Grid for beginner's categories */}
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: 'rgba(0,0,0,0.7)',
              color: 'white',
              '&:hover': { backgroundColor: 'rgba(0,0,0,0.9)' },
              width: '100%',
            }}
            onClick={() => {
              window.location.href = '/tutorials'; // Link to Tutorials section
            }}
          >
            שיעורים פרטניים
          </Button>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: 'rgba(0,0,0,0.7)',
              color: 'white',
              '&:hover': { backgroundColor: 'rgba(0,0,0,0.9)' },
              width: '100%',
            }}
            onClick={() => {
              window.location.href = '/yoga'; // Link to Yoga section
            }}
          >
            יוגה למתחילים
          </Button>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: 'rgba(0,0,0,0.7)',
              color: 'white',
              '&:hover': { backgroundColor: 'rgba(0,0,0,0.9)' },
              width: '100%',
            }}
            onClick={() => {
              window.location.href = '/breathing'; // Link to Breathing section
            }}
          >
            טכניקות נשימה למתחילים
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
