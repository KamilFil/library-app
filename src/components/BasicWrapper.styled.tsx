import { Box, styled } from '@mui/material';

export const StyledBasicWrapper = styled(Box)({
  width: '90%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '10px',
  borderRadius: '25px',
  padding: '25px',
});

export const StyledBasicWrapperContainer = styled(Box)({
  marginTop: '50px',
  marginBottom: '100px',
  width: '90%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
});
