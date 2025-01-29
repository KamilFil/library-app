import { Button } from '@mui/material';
import { useAuth } from '../../hooks/useAuth.ts';

export const SignIn = () => {
  const { logout, login, register } = useAuth();
  const handleRegister = async () => {
    return register({
      email: 'Joe Doe',
      password: 'password',
      firstName: 'Joe',
      lastName: 'Doe',
    });
  };

  const handleLogin = async () => {
    return login('Joe Doe', 'password');
  };

  const handleLogout = () => {
    return logout();
  };
  return (
    <>
      <Button onClick={handleLogin}>Logowanie</Button>
      <Button onClick={handleRegister}>Rejestracja</Button>
      <Button onClick={handleLogout}>Logout</Button>
    </>
  );
};
