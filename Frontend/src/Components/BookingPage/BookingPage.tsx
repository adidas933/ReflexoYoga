import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import ServiceCard from './ServiceCard';
import { bookingService } from '../../Services/BookingService';

const BookingPage = () => {
  const [selectedService, setSelectedService] = useState('');
  const [selectedInstructor, setSelectedInstructor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const handleBookingSubmit = async () => {
    const bookingData = {
      service: selectedService,
      instructor: selectedInstructor,
      selectedDate: selectedDate,
      selectedTime: selectedTime,
      userName: userName,
      userEmail: userEmail,
    };

    try {
      // Add booking to backend
      await bookingService.addBooking(bookingData);
      alert(`Booking confirmed for ${selectedService} on ${selectedDate} at ${selectedTime} with ${selectedInstructor}`);
    } catch (error) {
      console.error('Error booking service:', error);
      alert('There was an issue with your booking.');
    }
  };

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
      <Typography variant="h4" sx={{ marginTop: '20px' }}>
        הזמן את השירות שלך
      </Typography>
      <Box sx={{ marginTop: '20px' }}>
        <Grid container spacing={3}>
          {servicesList.map((item) => (
            <Grid item xs={12} sm={6} key={item.title}>
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

      <Box sx={{ marginTop: '40px' }}>
        <Typography variant="h6">פרטי המשתמש</Typography>
        <TextField
          label="שם מלא"
          fullWidth
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          sx={{ marginBottom: '15px' }}
        />
        <TextField
          label="אימייל"
          fullWidth
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          sx={{ marginBottom: '15px' }}
        />
        <FormControl fullWidth sx={{ marginBottom: '15px' }}>
          <InputLabel>שירות</InputLabel>
          <Select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            label="שירות"
          >
            <MenuItem value="yoga">יוגה</MenuItem>
            <MenuItem value="reflexology">רפלקסולוגיה</MenuItem>
            <MenuItem value="ice_bath">אמבטיית קרח</MenuItem>
            <MenuItem value="sadhu_nails">מסמרי סאדהו</MenuItem>
          </Select>
        </FormControl>

        {/* Instructor Selection */}
        <FormControl fullWidth sx={{ marginBottom: '15px' }}>
          <InputLabel>מורה</InputLabel>
          <Select
            value={selectedInstructor}
            onChange={(e) => setSelectedInstructor(e.target.value)}
            label="מורה"
          >
            <MenuItem value="instructor1">מורה 1</MenuItem>
            <MenuItem value="instructor2">מורה 2</MenuItem>
            <MenuItem value="instructor3">מורה 3</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="תאריך"
          type="date"
          fullWidth
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          sx={{ marginBottom: '15px' }}
        />
        <TextField
          label="שעה"
          type="time"
          fullWidth
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          sx={{ marginBottom: '15px' }}
        />
        <Button
          variant="contained"
          onClick={handleBookingSubmit}
          sx={{
            backgroundColor: '#6a1b9a',
            color: 'white',
            '&:hover': { backgroundColor: '#9c4dcc' },
          }}
        >
          אשר הזמנה
        </Button>
      </Box>
    </Container>
  );
};

export default BookingPage;
