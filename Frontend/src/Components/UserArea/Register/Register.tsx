import { useForm } from 'react-hook-form';
import './Register.css';
import { UserModel } from '../../../Models/UserModel';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../../Services/UserService';
import { notify } from '../../../Utils/Notify';
import { TextField, Button, Box, Typography, Container } from '@mui/material';

export function Register(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UserModel>();
  const navigate = useNavigate();



  async function validateEmail(email: string) {
    const isRegistered = await userService.isEmailRegistered(email);
    if (isRegistered) {
      return 'Email is already registered';
    }
    return true;
  }

  async function send(user: UserModel) {
    try {
      await userService.register(user);
      notify.success('Welcome ' + user.firstName);
      navigate('/home');
    } catch (err: any) {
      notify.error(err);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit(send)} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="First Name"
            margin="normal"
            {...register('firstName', {
              required: 'First name is required',
              minLength: {
                value: 2,
                message: 'First name must be at least 2 characters',
              },
            })}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
          <TextField
            fullWidth
            label="Last Name"
            margin="normal"
            {...register('lastName', {
              required: 'Last name is required',
              minLength: {
                value: 2,
                message: 'Last name must be at least 2 characters',
              },
            })}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address',
              },
              validate: validateEmail, // Asynchronous validation to check if email is already registered

            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters long',
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character',
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
