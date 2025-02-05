import { Box, styled } from '@mui/material';

export const StyledUserStatsBox = styled(Box)(({ theme }) => ({
  border: `4px solid ${theme.palette.primary.main}`,
  display: 'flex',
  flexDirection: 'column',
  width: '90%',
  padding: '40px',
  gap: '20px',
  backgroundColor: 'white',
  borderRadius: '25px',
}));
