import { Box, Button, Typography } from '@mui/material';
import { useAuth } from '../../../hooks/useAuth.ts';
import { useForm } from 'react-hook-form';
import { StyledTextField } from './styles/Form.styles.ts';

interface LoginFormInput {
  email: string;
  password: string;
}

interface Props {
  handleSwitchForm: () => void;
}

export const LoginForm = ({ handleSwitchForm }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>();
  const { loginMutation } = useAuth();

  const handleLogin = (data: LoginFormInput) => {
    loginMutation.mutate(data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleLogin)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        margin: '10px',
        width: '30%',
        boxShadow: '0 0 10px black',
        padding: '20px',
      }}
    >
      <Typography variant="h2" sx={{ color: 'black' }}>
        Zaloguj się
      </Typography>
      <StyledTextField
        sx={{ color: 'black' }}
        placeholder="Email"
        {...register('email', { required: true })}
        error={!!errors.email}
        helperText={errors.email ? 'Email is required' : ''}
      />
      <StyledTextField
        sx={{ color: 'black' }}
        placeholder="Password"
        {...register('password', { required: true, minLength: 6 })}
        error={!!errors.password}
        helperText={errors.password ? 'Password is required' : ''}
      />
      <Button type="submit" variant="contained" color="primary">
        Logowanie
      </Button>
      <Button
        type="submit"
        variant="outlined"
        color="primary"
        onClick={handleSwitchForm}
      >
        Utwórz konto
      </Button>
    </Box>
  );
};
