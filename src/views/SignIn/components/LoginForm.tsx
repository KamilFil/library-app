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
      <Typography
        variant="h4"
        sx={{ color: 'black', marginBottom: '20px', fontWeight: 'bold' }}
      >
        Log in
      </Typography>
      <StyledTextField
        sx={{ color: 'black' }}
        type="email"
        placeholder="Email"
        {...register('email', { required: true })}
        error={!!errors.email}
        helperText={errors.email ? 'Email is required' : ''}
      />
      <StyledTextField
        sx={{ color: 'black' }}
        type="password"
        placeholder="Password"
        {...register('password', { required: true, minLength: 6 })}
        error={!!errors.password}
        helperText={errors.password ? 'Password is required' : ''}
      />
      <Button
        sx={{ marginBottom: 1 }}
        type="submit"
        variant="contained"
        color="primary"
      >
        Login
      </Button>
      <Button variant="outlined" color="primary" onClick={handleSwitchForm}>
        Create an account
      </Button>
    </Box>
  );
};
