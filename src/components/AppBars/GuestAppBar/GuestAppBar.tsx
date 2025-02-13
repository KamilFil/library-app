import { StyledGuestAppBar } from './GuestAppBar.styled';
import { LoginBox } from './LoginBox/LoginBox';
import { LogoBox } from './LogoBox/LogoBox';

export const GuestAppBar = () => {
  return (
    <StyledGuestAppBar>
      <LogoBox />
      <LoginBox />
    </StyledGuestAppBar>
  );
};
