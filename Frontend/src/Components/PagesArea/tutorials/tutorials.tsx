import { Box, Typography, Button, Grid } from '@mui/material';

export function Tutorials(): JSX.Element {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url("/images/tutorials-bg.jpg")`, // Replace with your image path
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
        direction: 'rtl', // Right-to-left layout for Hebrew
      }}
    >
      <Typography variant="h2" sx={{ mb: 2 }}>
       המדריכים שלנו
      </Typography>
      <Typography variant="h6" sx={{ mb: 4, maxWidth: '600px' }}>
        בין אם אתה מתחיל או מחפש להעמיק את הפרקטיקה שלך, המדריכים שלנו נועדו להנחות אותך בכל שלב בדרך.
      </Typography>
      
      {/* Grid for tutorial categories */}
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
              window.location.href = '/yoga'; // Link to Yoga tutorial section
            }}
          >
            מדריכי יוגה
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
              window.location.href = '/breathing'; // Link to Breathing tutorial section
            }}
          >
            טכניקות נשימה
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
              window.location.href = '/meditation'; // Link to Meditation tutorial section
            }}
          >
            מדריכי מדיטציה
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
