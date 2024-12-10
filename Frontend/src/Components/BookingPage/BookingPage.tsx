import {
  Container,
  Box,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ServiceCard from './ServiceCard';
import { useState } from 'react';
import { BookingForm } from './BookingForm';

const BookingPage = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const servicesList = [
    {
      id: '1', // Add unique ID
      title: 'שיעור יוגה',
      description: 'שיעור יוגה של 60 דקות להרפיה ומתיחות',
      image: '/images/yoga-booking.jpg',
      link: '/yoga-booking',
    },
    {
      id: '2', // Add unique ID
      title: 'טיפול רפלקסולוגי',
      description: 'סשן רפלקסולוגי מרגיע לשחרור מתח.',
      image: '/images/reflexology-booking.jpg',
      link: '/reflexology-booking',
    },
    {
      id: '3', // Add unique ID
      title: 'מסמרי סאדהו',
      description: 'סדנה ייחודית המשלבת עמידה על מסמרים.',
      image: '/images/sadhu-nails-booking.jpg',
      link: '/sadhu-nails-booking',
    },
    {
      id: '4', // Add unique ID
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
        <Grid container spacing={3} justifyContent="center" alignItems="stretch">
          {servicesList.map((item) => (
            <Grid item xs={12} sm={5} key={item.id}>
              <Accordion>
                <AccordionSummary
                  aria-controls={`${item.title}-content`}
                  id={`${item.title}-header`}
                >
                  <ServiceCard
                    title={item.title}
                    description={item.description}
                    image={item.image}
                    link={item.link}
                    onOrderNow={() => setSelectedService(item.id)} // Pass the ID
                  />
                </AccordionSummary>
                <AccordionDetails>
                  {selectedService === item.id && (
                    <Box sx={{ marginTop: '40px' }}>
                      <BookingForm serviceId={item.id}  />
                    </Box>
                  )}
                </AccordionDetails>
              </Accordion>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default BookingPage;
