import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, instructorActions, serviceActions } from '../../Redux/store';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import ServiceCard from './ServiceCard';
import { BookingForm } from './BookingForm';
import { ServiceModel } from '../../Models/ServiceModel';
import { serviceService } from '../../Services/ServiceService';
import { instructorService } from '../../Services/InstructorService';

const BookingPage = () => {
  const services = useSelector<AppState, ServiceModel[]>(
    (store) => store.services
  );
  const dispatch = useDispatch();
  const [selectedService, setSelectedService] = useState('');
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [servicesData, instructorsData] = await Promise.all([
          serviceService.getAllServices(),
          instructorService.getAllInstructors(),
        ]);
        dispatch(serviceActions.initServices(servicesData));
        dispatch(instructorActions.initInstructors(instructorsData));
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);
  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: '50px' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ marginTop: '10px' }}>
          טוען שירותים...
        </Typography>
      </Box>
    );
  }
  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ marginTop: '20px', textAlign: 'center' }}>
          {error}
        </Alert>
      </Container>
    );
  }
  return (
    <Container>
      <Typography variant="h4" sx={{ marginTop: '20px', textAlign: 'center' }}>
        הזמן את השירות שלך
      </Typography>
      <Box sx={{ marginTop: '20px' }}>
        <Grid
          container
          spacing={3}
          justifyContent="center"
          alignItems="stretch"
        >
          {services.map((item) => (
            <Grid item xs={12} sm={5} key={item._id}>
              <Accordion>
                <AccordionSummary
                  aria-controls={`${item.title}-content`}
                  id={`${item.title}-header`}
                >
                  <ServiceCard
                    title={item.title}
                    description={item.description}
                    image={item.image}
                    onOrderNow={() => setSelectedService(item._id)} // Pass the ID
                  />
                </AccordionSummary>
                <AccordionDetails>
                  {selectedService === item._id && (
                    <Box sx={{ marginTop: '40px' }}>
                      <BookingForm />
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
