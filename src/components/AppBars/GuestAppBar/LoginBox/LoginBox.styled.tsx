import { Box, Button, styled } from '@mui/material';

export const StyledLoginBox = styled(Box)({
  gap: 5,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const StyledLoginButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  fontWeight: 'bold',
}));
