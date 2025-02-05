import LoginIcon from '@mui/icons-material/Login';
import { StyledLoginBox, StyledLoginButton } from './LoginBox.styled';
import { useNavigate } from '@tanstack/react-router';

export const LoginBox = () => {
  const navigate = useNavigate();

  const loginHandler = () => {
    navigate({ to: '/sign-in' });
  };

  return (
    <>
      <StyledLoginBox>
        <StyledLoginButton
          variant="outlined"
          startIcon={<LoginIcon />}
          onClick={loginHandler}
        >
          Log In
        </StyledLoginButton>
      </StyledLoginBox>
    </>
  );
};
