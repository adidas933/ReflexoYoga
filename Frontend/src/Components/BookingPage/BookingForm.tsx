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
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../Redux/store';
import { UserModel } from '../../Models/UserModel';
interface Instructor {
  _id:string
  name:string
}

interface BookingFormProps {
  serviceId: string;
}

export function BookingForm({ serviceId }: BookingFormProps) {
  const user = useSelector<AppState, UserModel>((store) => store.user);
  const [instructors,setInstructors] = useState<Instructor[]>([])
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingModel>();

  const navigate = useNavigate();


  useEffect(() => {
    const fetchInstructors = async () => {
      const data = await bookingService.getAllInstructors()
      console.log('Fetched instructors: ' + data);
      setInstructors(data)
    }
    fetchInstructors()
  }, [])
  
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
      console.log(booking.serviceId);
      // Create FormData to handle submission
      const payload = {
        selectedDate: booking.selectedDate,
        selectedTime: booking.selectedTime,
        instructorId: booking.instructorId,
        serviceId,
        userId: user._id,
      };
      // Send data to the backend
      await bookingService.addBooking(payload);
      // Notify user of success
      notify.success('Booking created successfully');
      navigate('/bookings'); // Redirect to booking list page
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

      <TextField
        variant="outlined"
        value={serviceId}
        inputProps={{
          readOnly: true,
        }}
      />

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
          {instructors.map((instructor) =>(
            <MenuItem key={instructor._id} value={instructor._id}>{instructor.name}</MenuItem>
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
/* 
{
  "serviceId":"6755694c1acc3733920e2caa",
  "instructorId":"675567fe1acc3733920e2ca2",
  "userId": "6752bb5fdab3d5c2760dd43c",
  "selectedDate": "2024-12-15",
  "selectedTime":"14:30"
} */