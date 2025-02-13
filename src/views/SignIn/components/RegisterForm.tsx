import { Button, Typography } from '@mui/material';
import { useAuth } from '../../../hooks/useAuth.ts';
import { useForm } from 'react-hook-form';
import { StyledBox, StyledTextField } from './styles/Form.styles.ts';

interface RegisterFormInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface Props {
  handleSwitchForm: () => void;
}

export const RegisterForm = ({ handleSwitchForm }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInput>();
  const { registerMutation } = useAuth();

  const handleRegister = async (data: RegisterFormInput) => {
    registerMutation.mutate(data);
  };

  return (
    <StyledBox component="form" onSubmit={handleSubmit(handleRegister)}>
      <Typography
        variant="h4"
        sx={{ color: 'black', marginBottom: '20px', fontWeight: 'bold' }}
      >
        Sign Up
      </Typography>
      <StyledTextField
        placeholder="Email"
        type="email"
        {...register('email', { required: true })}
        error={!!errors.email}
        helperText={errors.email ? 'Email is required' : ''}
      />
      <StyledTextField
        type="password"
        placeholder="Password"
        {...register('password', { required: true, minLength: 5 })}
        error={!!errors.password}
        helperText={errors.password ? 'Password is required' : ''}
      />
      <StyledTextField
        placeholder="Lastname"
        {...register('lastName', { required: true, minLength: 3 })}
        error={!!errors.lastName}
        helperText={errors.lastName ? 'Lastname is required' : ''}
      />
      <StyledTextField
        placeholder="Firstname"
        {...register('firstName', { required: true, minLength: 3 })}
        error={!!errors.firstName}
        helperText={errors.lastName ? 'Firstname is required' : ''}
      />
      <Button
        sx={{ marginBottom: 1 }}
        type="submit"
        variant="contained"
        color="primary"
      >
        Sign Up
      </Button>
      <Button variant="outlined" color="primary" onClick={handleSwitchForm}>
        Login
      </Button>
    </StyledBox>
  );
};
