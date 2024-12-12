import { Container, Typography } from '@mui/material';

const ThankYouPage = () => {
  return (
    <Container>
      <Typography variant="h4" sx={{ textAlign: 'center', marginTop: '20px' }}>
        Thank You for Your Booking!
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'center', marginTop: '20px' }}>
        Your booking has been confirmed.
      </Typography>
    
    </Container>
  );
};

export default ThankYouPage;
