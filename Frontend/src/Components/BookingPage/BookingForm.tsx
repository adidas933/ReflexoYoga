import { useForm } from 'react-hook-form';
import { BookingModel } from '../../Models/BookingModel';
import { bookingService } from '../../Services/BookingService';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'; // MUI Components
import { notify } from '../../Utils/Notify';
import { useSelector } from 'react-redux';
import { AppState } from '../../Redux/store';
import { UserModel } from '../../Models/UserModel';
import { InstructorModel } from '../../Models/InstructorModel';
import { ServiceModel } from '../../Models/ServiceModel';
import ThankYouPage from './ThankYouPage';

export function BookingForm() {
  const user = useSelector<AppState, UserModel>((store) => store.user);
  const instructors = useSelector<AppState, InstructorModel[]>(
    (store) => store.instructors
  );
  const services = useSelector<AppState, ServiceModel[]>(
    (store) => store.services
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingModel>();

  const navigate = useNavigate();

  // Function to validate the date
  const validateDate = (date: string) => {
    const today = new Date();
    const selectedDate = new Date(date);
    if (selectedDate < today) {
      return "Date can't be in the past";
    }
    return true;
  };

  async function send(booking: BookingModel) {
    try {
      // Create payload
      const payload: BookingModel = {
        selectedDate: booking.selectedDate,
        selectedTime: booking.selectedTime,
        instructorId: booking.instructorId,
        userId: user._id,
        serviceId: booking.serviceId,
      };

      // Send data to the backend
      await bookingService.addBooking(payload);

      // Notify user of success
      notify.success('Booking created successfully');
      <ThankYouPage/>
    } catch (error) {
      console.error('Error creating booking:', error);
      notify.error('Failed to create booking');
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(send)}
      sx={{
        maxWidth: 400,
        margin: 'auto',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{ textAlign: 'center', marginBottom: 3 }}
      >
        Book a Service
      </Typography>

      <FormControl fullWidth>
        <InputLabel id="service-label">Service</InputLabel>
        <Select
          labelId="service-label"
          {...register('serviceId', {
            required: 'Service is required',
          })}
          error={!!errors.serviceId}
        >
          {services.map((service) => (
            <MenuItem key={service._id} value={service._id}>
              {service.title}
            </MenuItem>
          ))}
        </Select>
        <Typography variant="caption" color="error">
          {errors.serviceId?.message}
        </Typography>
      </FormControl>

      <TextField
        label="Date"
        variant="outlined"
        type="date"
        {...register('selectedDate', {
          required: 'Date is required',
          validate: validateDate,
        })}
        error={!!errors.selectedDate}
        helperText={errors.selectedDate?.message}
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        label="Time"
        variant="outlined"
        type="time"
        {...register('selectedTime', {
          required: 'Time is required',
        })}
        error={!!errors.selectedTime}
        helperText={errors.selectedTime?.message}
        InputLabelProps={{ shrink: true }}
      />

      <FormControl fullWidth>
        <InputLabel id="instructor-label">Instructor</InputLabel>
        <Select
          labelId="instructor-label"
          {...register('instructorId', {
            required: 'Instructor is required',
          })}
          error={!!errors.instructorId}
        >
          {instructors.map((instructor) => (
            <MenuItem key={instructor._id} value={instructor._id}>
              {instructor.name}
            </MenuItem>
          ))}
        </Select>
        <Typography variant="caption" color="error">
          {errors.instructorId?.message}
        </Typography>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        type="submit"
        sx={{ marginTop: 3 }}
      >
        Confirm Booking
      </Button>
    </Box>
  );
}
