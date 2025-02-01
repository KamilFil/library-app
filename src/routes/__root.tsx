import { Outlet, createRootRoute } from '@tanstack/react-router';
import { BasicAppBar } from '../components/BasicAppBar/BasicAppBar.tsx';
import { Footer } from '../components/Footer/Footer.tsx';
import { Box } from '@mui/material';
import { Notification } from '../components/Notification/Notification.tsx';

const RootComponent = () => {
  return (
    <>
      <BasicAppBar />
      <Box sx={{ marginTop: '75px' }}>
        <Outlet />
      </Box>
      <Footer />
      <Notification />
    </>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
});
