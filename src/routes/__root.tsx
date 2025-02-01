import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Box, styled } from '@mui/material';
import { Footer } from '../components/Footer/Footer';
import { BasicWrapper } from '../components/BasicWrapper';
import { AuthRole } from '../types/auth';
import { GuestAppBar } from '../components/AppBars/GuestAppBar/GuestAppBar';
import { PanelAppBar } from '../components/AppBars/PanelAppBar/PanelAppBar';
import { Notification } from '../components/Notification/Notification.tsx';
import { useAuthStore } from '../store/useAuthStore.ts';

export const HomePage = () => {
  const { user } = useAuthStore();

  const StyledBox = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
  });

  return (
    <StyledBox>
      {user?.role === AuthRole.GUEST ? <GuestAppBar /> : null}
      {user?.role === AuthRole.ADMIN || user?.role === AuthRole.USER ? (
        <PanelAppBar />
      ) : null}
      <BasicWrapper>
        <Outlet />
      </BasicWrapper>
      <Footer />
      <Notification />
    </StyledBox>
  );
};

export const Route = createRootRoute({
  component: HomePage,
});
