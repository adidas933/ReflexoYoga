import {
  Container,
  Box,
  Typography,
  Grid,
} from '@mui/material';
import ServiceCard from './ServiceCard';

const BookingPage = () => {

  const servicesList = [
    {
      title: 'שיעור יוגה',
      description: 'שיעור יוגה של 60 דקות להרפיה ומתיחות',
      image: '/images/yoga-booking.jpg',
      link: '/yoga-booking',
    },
    {
      title: 'טיפול רפלקסולוגי',
      description: 'סשן רפלקסולוגי מרגיע לשחרור מתח.',
      image: '/images/reflexology-booking.jpg',
      link: '/reflexology-booking',
    },
    {
      title: 'מסמרי סאדהו',
      description: 'סדנה ייחודית המשלבת עמידה על מסמרים.',
      image: '/images/sadhu-nails-booking.jpg',
      link: '/sadhu-nails-booking',
    },
    {
      title: 'אמבטיית קרח',
      description: 'סדנת אמבטיית קרח המשלבת נשימות והיפר ונטילציה',
      image: '/images/icebath-booking.jpg',
      link: '/sadhu-nails-booking',
    },
  ];
  return (
    <Container>
      <Typography variant="h4" sx={{ marginTop: '20px', textAlign: 'center' }}>
        הזמן את השירות שלך
      </Typography>
      <Box sx={{ marginTop: '20px' }}>
        <Grid container spacing={3} justifyContent="center" alignItems='stretch'>
          {servicesList.map((item) => (
            <Grid item xs={12} sm={5} key={item.title}>
              <ServiceCard
                title={item.title}
                description={item.description}
                image={item.image}
                link={item.link}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

    </Container>
  );
};

export default BookingPage;
