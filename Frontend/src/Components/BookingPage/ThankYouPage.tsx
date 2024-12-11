import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const ThankYouPage = () => {
  return (
    <Container>
      <Typography variant="h4" sx={{ textAlign: 'center', marginTop: '20px' }}>
        Thank You for Your Booking!
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'center', marginTop: '20px' }}>
        Your booking has been confirmed.
      </Typography>
      <Button
        component={Link}
        to="/user-calendar"
        sx={{
          display: 'block',
          marginTop: '20px',
          backgroundColor: '#6a1b9a',
          color: 'white',
          '&:hover': { backgroundColor: '#9c4dcc' },
          margin: '0 auto',
        }}
      >
        Add to Calendar
      </Button>
    </Container>
  );
};

export default ThankYouPage;
