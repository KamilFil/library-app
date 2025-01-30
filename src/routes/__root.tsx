import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Box, Button, styled } from '@mui/material';
import { Footer } from '../components/Footer/Footer';
import { BasicWrapper } from '../components/BasicWrapper';
import { AuthRole } from '../types/auth';
import { GuestAppBar } from '../components/AppBars/GuestAppBar/GuestAppBar';
import { PanelAppBar } from '../components/AppBars/PanelAppBar/PanelAppBar';
import { useContext } from 'react';
import { UserRoleContext } from '../context/UserRoleContext';

export const HomePage = () => {
  const { user, setUser } = useContext(UserRoleContext);

  const StyledBox = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
  });

  return (
    <StyledBox>
      {user.role === AuthRole.GUEST ? <GuestAppBar /> : null}
      {user.role === AuthRole.ADMIN || user.role === AuthRole.USER ? (
        <PanelAppBar />
      ) : null}
      <Button onClick={() => setUser(AuthRole.GUEST)}>GUEST</Button>
      <Button onClick={() => setUser(AuthRole.ADMIN)}>ADMIN</Button>
      <Button onClick={() => setUser(AuthRole.USER)}>USER</Button>
      <BasicWrapper>
        <Outlet />
      </BasicWrapper>
      <Footer />
    </StyledBox>
  );
};

export const Route = createRootRoute({
  component: HomePage,
});
