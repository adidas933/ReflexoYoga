import { Box, Typography, Button } from '@mui/material';

export function Retreats(): JSX.Element {
  return (
    <Box
      sx={{
        height: '100vh',
        backgroundImage: `url("/images/retreats.jpg")`, // Replace with your image path
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
        ריטריטים ליוגה
      </Typography>
      <Typography variant="h6" sx={{ mb: 4, maxWidth: '600px' }}>
        ברחו מהשגרה היומיומית וצאו לנופש של רוגע. 
        הצטרפו אלינו לריטריט יוגה מחייה במקום שקט, שם השלווה פוגשת את הטבע.
      </Typography>
      <Button
        variant="contained"
        size="large"
        sx={{
          backgroundColor: 'rgba(0,0,0,0.7)',
          color: 'white',
          '&:hover': { backgroundColor: 'rgba(0,0,0,0.9)' },
        }}
        onClick={() => window.location.href = '/contact'} // Adjust the link as needed
      >
        הזמן את הריטריט שלך
      </Button>
    </Box>
  );
}
