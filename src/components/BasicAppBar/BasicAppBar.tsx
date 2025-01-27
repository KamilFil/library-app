import { StyledBasicAppBar } from './BasicAppBar.styled';
import { LoginBox } from './LoginBox/LoginBox';
import { LogoBox } from './LogoBox/LogoBox';

export const BasicAppBar = () => {
  return (
    <StyledBasicAppBar>
      <LogoBox />
      <LoginBox />
    </StyledBasicAppBar>
  );
};
