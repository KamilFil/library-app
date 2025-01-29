import { Box, styled } from '@mui/material';

export const StyledBasicWrapper = styled(Box)(({ theme }) => ({
  width: '90%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '10px',
  border: `2px solid ${theme.palette.primary.main}`,
  borderRadius: '25px',
  padding: '25px',
  boxShadow:
    '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)',
}));
