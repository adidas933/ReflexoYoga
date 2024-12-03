import { Box, Typography, TextField, Button } from '@mui/material';

export function Contact(): JSX.Element {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url("/images/contact-bg.jpg")`, // Replace with your image path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        px: 2,
        color: 'white',
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)',
        direction: 'rtl', // Added for right-to-left layout
      }}
    >
      <Box
        sx={{
          backgroundColor: 'rgba(0,0,0,0.7)',
          padding: 4,
          borderRadius: 2,
          width: '100%',
          maxWidth: '500px',
        }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          צור קשר
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          יש לכם שאלות או רוצים ללמוד יותר? שלחו לנו הודעה, ונחזור אליכם בהקדם.
        </Typography>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField 
            fullWidth 
            label="שִׁמְךָ" 
            variant="outlined" 
            InputProps={{ sx: { color: 'white' } }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'white' },
                '&:hover fieldset': { borderColor: 'white' },
                '&.Mui-focused fieldset': { borderColor: 'white' },
              },
              '& .MuiInputLabel-root': { color: 'white' },
              '& .MuiInputLabel-root.Mui-focused': { color: 'white' },
            }}
          />
          <TextField 
            fullWidth 
            label="דואר אלקטרוני שלך" 
            variant="outlined" 
            InputProps={{ sx: { color: 'white' } }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'white' },
                '&:hover fieldset': { borderColor: 'white' },
                '&.Mui-focused fieldset': { borderColor: 'white' },
              },
              '& .MuiInputLabel-root': { color: 'white' },
              '& .MuiInputLabel-root.Mui-focused': { color: 'white' },
            }}
          />
          <TextField
            fullWidth
            label="הודעה שלך"
            multiline
            rows={4}
            variant="outlined"
            InputProps={{ sx: { color: 'white' } }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'white' },
                '&:hover fieldset': { borderColor: 'white' },
                '&.Mui-focused fieldset': { borderColor: 'white' },
              },
              '& .MuiInputLabel-root': { color: 'white' },
              '& .MuiInputLabel-root.Mui-focused': { color: 'white' },
            }}
          />
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: 'rgba(255,255,255,0.9)',
              color: 'black',
              '&:hover': { backgroundColor: 'rgba(255,255,255,1)' },
            }}
          >
            שלח הודעה
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
