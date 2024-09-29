import { useForm } from 'react-hook-form';
import { VacationModel } from '../../../Models/VacationModel';
import { vacationService } from '../../../Services/VacationService';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  InputLabel,
  Input,
} from '@mui/material'; // MUI Components
import { notify } from '../../../Utils/Notify';

export function AddVacation() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<VacationModel>();

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

  // Function to validate end date against start date
  const validateEndDate = (endDate: string, startDate: string) => {
    if (new Date(endDate) < new Date(startDate)) {
      return "End date can't be before start date";
    }
    return true;
  };

  async function send(vacation: VacationModel) {
    try {
      vacation.image = (vacation.image as unknown as FileList)[0];
      console.log(vacation);
      await vacationService.addVacation(vacation);
      notify.success('Vacation added successfully');
      navigate('/list');
    } catch (error) {
      console.error('Error adding vacation:', error);
    }
  }

  return (
    <Box
      className="AddVacation"
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
        Add a Vacation
      </Typography>

      <TextField
        label="Destination"
        variant="outlined"
        {...register('destination', {
          required: 'Destination is required',
          minLength: { value: 2, message: 'Minimum length is 2' },
          maxLength: { value: 100, message: 'Maximum length is 100' },
        })}
        error={!!errors.destination}
        helperText={errors.destination?.message}
      />

      <TextField
        label="Description"
        variant="outlined"
        {...register('description', {
          required: 'Description is required',
          minLength: { value: 10, message: 'Minimum length is 10' },
          maxLength: { value: 1000, message: 'Maximum length is 1000' },
        })}
        error={!!errors.description}
        helperText={errors.description?.message}
        multiline
        rows={4}
      />

      <TextField
        label="Start Date"
        variant="outlined"
        type="date"
        {...register('startDate', {
          required: 'Start date is required',
          validate: validateDate,
        })}
        error={!!errors.startDate}
        helperText={errors.startDate?.message}
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        label="End Date"
        variant="outlined"
        type="date"
        {...register('endDate', {
          required: 'End date is required',
          validate: (value) => validateEndDate(value, watch('startDate')),
        })}
        error={!!errors.endDate}
        helperText={errors.endDate?.message}
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        label="Price"
        variant="outlined"
        type="number"
        {...register('price', {
          required: 'Price is required',
          validate: {
            positive: (value) => value >= 0 || 'Price cannot be negative',
            max: (value) => value <= 10000 || 'Price cannot exceed 10,000',
          },
        })}
        error={!!errors.price}
        helperText={errors.price?.message}
      />

      <InputLabel htmlFor="image-upload">Image</InputLabel>
      <Input
        id="image-upload"
        type="file"
        inputProps={{ accept: 'image/*' }}
        {...register('image')}
        error={!!errors.image?.message}
        required
      />

      <Button
        variant="contained"
        color="primary"
        type="submit"
        sx={{ marginTop: 3 }}
      >
        Add Vacation
      </Button>
    </Box>
  );
}
