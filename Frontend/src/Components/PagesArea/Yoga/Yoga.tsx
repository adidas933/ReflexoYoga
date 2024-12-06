import { Box, Typography, Button } from '@mui/material';

export function Yoga(): JSX.Element {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url("/images/yoga-bg.jpg")`, // Replace with your image path
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
      <Typography variant="h2" sx={{ mb: 2 }}>
        אמצו את דרך היוגה
      </Typography>
      <Typography variant="h6" sx={{ mb: 4, maxWidth: '600px' }}>
        גלו שלום פנימי, איזון והרמוניה דרך תרגולי יוגה מודרכים. 
        בין אם אתם מתחילים או יוגים מנוסים, יש לנו משהו לכל אחד.
      </Typography>
      <Button
        variant="contained"
        size="large"
        sx={{
          backgroundColor: 'rgba(255,255,255,0.9)',
          color: 'black',
          '&:hover': { backgroundColor: 'rgba(255,255,255,1)' },
        }}
        onClick={() => {
          window.location.href = '/retreats'; // Navigate to a relevant page
        }}
      >
        הירשמו עכשיו
      </Button>
    </Box>
  );
}
