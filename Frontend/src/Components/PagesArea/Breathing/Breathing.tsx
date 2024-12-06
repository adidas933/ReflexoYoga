import { Box, Typography, Button, Grid } from '@mui/material';

export function Breathing(): JSX.Element {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url("/images/breathing-bg.jpg")`, // Replace with your image path
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
        טכניקות נשימה להרפיה
      </Typography>
      <Typography variant="h6" sx={{ mb: 4, maxWidth: '600px' }}>
        גלו טכניקות נשימה שונות שיכולות לעזור להרגיע את תודעתכם, להפחית מתח ולשפר את מצב רוחכם.
      </Typography>
      
      {/* Grid for breathing techniques */}
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
            נשימה עמוקה
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
            נשימת קופסה
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
              window.location.href = '/meditation'; // Link to Meditation section
            }}
          >
            נשימה דרך נחיריים חלופיים
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
