import { Box, styled, Typography } from '@mui/material';

export const App = () => {
  const StyledBox = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
  });

  return (
    <StyledBox>
      <Typography variant="h1">LibraryAPP</Typography>
    </StyledBox>
  );
};
