import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Box, styled } from '@mui/material';
import { BasicAppBar } from '../components/BasicAppBar/BasicAppBar';
import { Footer } from '../components/Footer/Footer';
import { BasicWrapper } from '../components/BasicWrapper';

export const HomePage = () => {
  const StyledBox = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
  });

  return (
    <StyledBox>
      <BasicAppBar />
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
