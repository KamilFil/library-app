import { Box, styled, Typography } from '@mui/material';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const App = () => {
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
