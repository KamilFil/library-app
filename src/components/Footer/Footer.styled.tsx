import { Box, styled } from '@mui/material';

export const StyledFooter = styled(Box)(({ theme }) => ({
  position: 'fixed',
  left: 0,
  bottom: 0,
  width: '100%',
  background: theme.palette.primary.main,
  color: theme.palette.text.primary,
  padding: '10px',
  display: 'flex',
  justifyContent: 'center',
}));
