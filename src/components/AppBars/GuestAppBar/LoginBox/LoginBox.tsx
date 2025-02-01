import LoginIcon from '@mui/icons-material/Login';
import { StyledLoginBox } from './LoginBox.styled';
import { useAuthStore } from '../../../../store/useAuthStore';
import { useAuth } from '../../../../hooks/useAuth';

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
