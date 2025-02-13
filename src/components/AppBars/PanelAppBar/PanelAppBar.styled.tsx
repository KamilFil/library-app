import { Box, Drawer, styled } from '@mui/material';

export const StyledPanelAppBarBox = styled(Box)({
  display: 'flex',
  zIndex: '0',
});

export const StyledPanelAppBarDrawer = styled(Drawer)({
  width: 300,
  flexShrink: 0,
  [`& .MuiDrawer-paper`]: { width: 300, boxSizing: 'border-box' },
});

export const StyledPanelAppBarUserDataBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  width: '90%',
  height: '70px',
  display: 'flex',
  justifyContent: 'center',
  marginTop: '10px',
  marginBottom: '10xp',
  borderRadius: '20px',
}));
