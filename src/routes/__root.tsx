import { createRootRoute } from '@tanstack/react-router';
import { Box, styled, Typography } from '@mui/material';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const HomePage = () => {
  const StyledBox = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
  });

  return (
    <StyledBox>
      <Typography variant="h1">LibraryAPP</Typography>
      <TanStackRouterDevtools />
    </StyledBox>
  );
};

export const Route = createRootRoute({
  component: HomePage,
});
