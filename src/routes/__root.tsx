import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Box, Button, styled } from '@mui/material';
import { Footer } from '../components/Footer/Footer';
import { BasicWrapper } from '../components/BasicWrapper';
import { AuthRole } from '../types/auth';
import { createContext, useState } from 'react';
import { GuestAppBar } from '../components/AppBars/GuestAppBar/GuestAppBar';
import { PanelAppBar } from '../components/AppBars/PanelAppBar/PanelAppBar';

const UserRoleContext = createContext(AuthRole.GUEST);

export const HomePage = () => {
  const StyledBox = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
  });

  const [user, setUser] = useState<AuthRole>(AuthRole.GUEST);
  return (
    <UserRoleContext.Provider value={user}>
      <StyledBox>
        {user === AuthRole.GUEST ? <GuestAppBar /> : null}
        {user === AuthRole.ADMIN || user === AuthRole.USER ? (
          <PanelAppBar />
        ) : null}
        <Button onClick={() => setUser(AuthRole.GUEST)}>QUEST</Button>
        <Button onClick={() => setUser(AuthRole.ADMIN)}>ADMIN</Button>
        <Button onClick={() => setUser(AuthRole.USER)}>USER</Button>
        <BasicWrapper>
          <Outlet />
        </BasicWrapper>
        <Footer />
      </StyledBox>
    </UserRoleContext.Provider>
  );
};

export const Route = createRootRoute({
  component: HomePage,
});
