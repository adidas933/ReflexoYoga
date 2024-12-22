import {
    Alert,
    Box,
    CircularProgress,
    Container,
    Typography,
    Card,
    CardContent,
    Divider,
    Grid,
  } from '@mui/material';
  import { useEffect, useState } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import { AppState, bookingActions } from '../../../Redux/store';
  import { BookingModel } from '../../../Models/BookingModel';
  import { bookingService } from '../../../Services/BookingService';
  import { UserModel } from '../../../Models/UserModel';
  import { useNavigate } from 'react-router-dom';
  
  export const UserPage = () => {
    const bookings = useSelector<AppState, BookingModel[]>((store) => store.bookings);
    const user = useSelector<AppState, UserModel>((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
  
    useEffect(() => {
      if (!user || !user._id) {
        // If user is not logged in, redirect to login page
        navigate('/login');
        return;
      }
  
      const fetchData = async () => {
        try {
          setLoading(true);
  
          // Fetch bookings only if not already in Redux
          if (!bookings || bookings.length === 0) {
            const fetchedBookings = await bookingService.getUserBookings(user._id);
            dispatch(bookingActions.initBookings(fetchedBookings));
          }
          setLoading(false);
        } catch (error) {
          console.log(error);
          setError('Failed to fetch data. Please try again later.');
          setLoading(false);
        }
      };
      fetchData();
    }, [dispatch, bookings, user, navigate]);
  
    if (loading) {
      return (
        <Box sx={{ textAlign: 'center', marginTop: '50px' }}>
          <CircularProgress />
          <Typography variant="h6" sx={{ marginTop: '10px' }}>
            טוען איזור אישי...
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
  
    if (!bookings || bookings.length === 0) {
      return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
          <Typography variant="h6" align="center">
            לא נמצאו הזמנות.
          </Typography>
        </Container>
      );
    }
  
    return (
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          ההזמנות שלי
        </Typography>
  
        <Grid container spacing={3}>
          {bookings.map((booking) => (
            <Grid item xs={12} sm={6} md={4} key={booking._id}>
              <Card variant="outlined" sx={{ boxShadow: 2 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    שירות: {booking.serviceId.title}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    מורה: {booking.instructorId.name}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    תאריך: {booking.selectedDate}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    שעה: {booking.selectedTime}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  };
  