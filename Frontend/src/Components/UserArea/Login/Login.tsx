import { useForm } from "react-hook-form";
import { CredentialsModel } from "../../../Models/CredentialsModel";
import { useNavigate } from "react-router-dom";
import { userService } from "../../../Services/UserService";
import { notify } from "../../../Utils/Notify";
import { TextField, Button, Box, Typography, Container } from '@mui/material';

export function Login(): JSX.Element {
    const { register, handleSubmit } = useForm<CredentialsModel>();
    const navigate = useNavigate();

    async function send(credentials: CredentialsModel) {
        try {
            await userService.login(credentials);
            notify.success("ברוכים השבים!");
            navigate("/home");
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
                    !ברוכים השבים
                </Typography>
                <Box component="form" onSubmit={handleSubmit(send)} sx={{ mt: 3 }}>
                    <TextField
                        fullWidth
                        label="אימייל"
                        type="email"
                        margin="normal"
                        {...register("email")}
                        required
                    />
                    <TextField
                        fullWidth
                        label="סיסמא"
                        type="password"
                        margin="normal"
                        {...register("password")}
                        required
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        כניסה
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
