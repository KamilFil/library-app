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
      <Typography variant="h3" sx={{ color: 'black' }}>
        Załóż konto
      </Typography>
      <StyledTextField
        placeholder="Email"
        {...register('email', { required: true })}
        error={!!errors.email}
        helperText={errors.email ? 'Email is required' : ''}
      />
      <StyledTextField
        placeholder="Password"
        {...register('password', { required: true, minLength: 6 })}
        error={!!errors.password}
        helperText={errors.password ? 'Password is required' : ''}
      />
      <StyledTextField
        placeholder="Lastname"
        {...register('lastName', { required: true, minLength: 6 })}
        error={!!errors.lastName}
        helperText={errors.lastName ? 'Lastname is required' : ''}
      />
      <StyledTextField
        placeholder="Firstname"
        {...register('firstName', { required: true, minLength: 6 })}
        error={!!errors.firstName}
        helperText={errors.lastName ? 'Firstname is required' : ''}
      />
      <Button type="submit" variant="contained" color="primary">
        Rejestracja
      </Button>
      <Button
        type="submit"
        variant="outlined"
        color="primary"
        onClick={handleSwitchForm}
      >
        Mam już konto
      </Button>
    </StyledBox>
  );
};
