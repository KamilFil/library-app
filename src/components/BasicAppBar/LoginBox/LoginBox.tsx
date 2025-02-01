import LoginIcon from '@mui/icons-material/Login';
import { StyledLoginBox } from './LoginBox.styled';
import { useAuth } from '../../../hooks/useAuth.ts';
import { useAuthStore } from '../../../store/useAuthStore.ts';

export const LoginBox = () => {
  const { logout } = useAuth();
  const { isAuthenticated } = useAuthStore();

  return (
    <>
      {isAuthenticated ? (
        <StyledLoginBox onClick={logout}>
          <LoginIcon />
          Log In
        </StyledLoginBox>
      ) : null}
    </>
  );
};
