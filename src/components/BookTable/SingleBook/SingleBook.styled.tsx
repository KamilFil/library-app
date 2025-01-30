import { Box, Button, styled } from '@mui/material';

export const StyledSingleBookContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '60%',
  gap: '30px',
  padding: '30px',
  border: `3px solid ${theme.palette.primary.main}`,
  borderRadius: '30px',
}));

export const StyledSingleBookBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

export const StyledBackButton = styled(Button)({
  color: 'black',
  fontWeight: 'bold',
  fontSize: '20px',
});
