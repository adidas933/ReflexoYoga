import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { notify } from '../../../Utils/Notify';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { userService } from '../../../Services/UserService';
import { UserModel } from '../../../Models/UserModel';

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
      return 'אימייל זה כבר רשום';
    }
    return true;
  }

  async function send(user: UserModel) {
    try {
      await userService.register(user);
      notify.success('ברוך הבא ' + user.firstName);
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
          הרשמה
        </Typography>
        <Box component="form" onSubmit={handleSubmit(send)} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="שם פרטי"
            margin="normal"
            {...register('firstName', {
              required: 'שם פרטי נדרש',
              minLength: {
                value: 2,
                message: 'שם פרטי חייב להיות לפחות 2 תווים',
              },
            })}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
          <TextField
            fullWidth
            label="שם משפחה"
            margin="normal"
            {...register('lastName', {
              required: 'שם משפחה נדרש',
              minLength: {
                value: 2,
                message: 'שם משפחה חייב להיות לפחות 2 תווים',
              },
            })}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
          <TextField
            fullWidth
            label="אימייל"
            type="email"
            margin="normal"
            {...register('email', {
              required: 'אימייל נדרש',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'אנא הכנס אימייל תקין',
              },
              validate: validateEmail, // בדיקה אסינכרונית לבדוק אם האימייל כבר רשום
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            fullWidth
            label="סיסמא"
            type="password"
            margin="normal"
            {...register('password', {
              required: 'סיסמא נדרשת',
              minLength: {
                value: 8,
                message: 'הסיסמא חייבת להיות לפחות 8 תווים',
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  'הסיסמא חייבת לכלול לפחות אות רישית אחת, אות קטנה אחת, מספר ואות מיוחדת אחת',
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
            הרשמה
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
