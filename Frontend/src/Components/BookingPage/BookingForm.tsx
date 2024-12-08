import { useForm } from "react-hook-form"
import { BookingModel } from "../../Models/BookingModel"
import { useNavigate } from "react-router-dom"
import { bookingService } from "../../Services/BookingService"
import { notify } from "../../Utils/Notify"
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"

interface BookingFormProps {
  serviceName:string
}

export function BookingForm({serviceName}:BookingFormProps) {
  const {register,handleSubmit,formState:{errors}} = useForm<BookingModel>()
  const navigate = useNavigate() 

  async function send(booking:BookingModel) {
    try {
      await bookingService.addBooking(booking)
      notify.success('Booking created successfully')
      navigate('/bookings')
    } catch (error:any) {
      console.error('Error creating booking: ', error)
    }
  }

  return (
    <Box
      component='form'
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
      component='h1'
      sx={{textAlign:'center',marginBottom:3}}
      >
Book a service
      </Typography>
      <TextField
      variant="outlined"
      value={serviceName}
      inputProps={{
        readOnly:true
      }}
      />

      <TextField
      label="Date"
      variant="outlined"
      type="date"
      {...register('selectedDate',{required:'Date is required',validate:(selectedDate:string) => {
        const today = new Date().toISOString().split('T')[0]
        return selectedDate >= today || "Date can't be in the past"
      }})}
      error={!!errors.selectedDate}
      helperText={errors.selectedDate?.message}
      InputLabelProps={{shrink:true}}
      />

      <TextField
        label="Hour"
        variant="outlined"
        type="time"
        {...register('selectedTime',  {required:'Hour is required'})}
        error={!!errors.selectedTime}
        helperText={errors.selectedTime?.message}
        InputLabelProps={{shrink:true}}
      />

      <FormControl fullWidth>
        <InputLabel id="instructor-label">Instructor</InputLabel>
        <Select
          labelId="instructor-label"
          defaultValue=""
          {...register('instructor',{required:'Instructor is required'})}
        error={!!errors.instructor}>
          <MenuItem value="John Doe">John Doe</MenuItem>
          <MenuItem value="Jane Smith">Jane Smith</MenuItem>
          <MenuItem value="Emily Johnson">Emily Johnson</MenuItem>
        </Select>
        <Typography variant="caption" color="error">
          {errors.instructor?.message}
        </Typography>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        type="submit"
        sx={{marginTop:3}}
        >
          Confirm Booking
        </Button>

    </Box>
  )
}