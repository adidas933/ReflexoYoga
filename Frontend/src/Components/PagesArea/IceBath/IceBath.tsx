import { Box, Typography, Button } from '@mui/material';

export function IceBath(): JSX.Element {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url("/images/ice-bath-bg.jpg")`, // Replace with your image path
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
        כוחה של אמבטיית קרח
      </Typography>
      <Typography variant="h6" sx={{ mb: 4, maxWidth: '600px' }}>
        אמבטיות קרח עוזרות בהפחתת דלקת, שיפור מחזור הדם ושיפור ההתאוששות.
        חוו את היתרונות של חשיפה לקור בסביבה מבוקרת ובטוחה.
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
          window.location.href = '/retreats'; // Navigate to a relevant page (e.g., retreats)
        }}
      >
        הזמן טיפול
      </Button>
    </Box>
  );
}
