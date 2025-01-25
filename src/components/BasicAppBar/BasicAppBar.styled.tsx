import { AppBar, styled } from '@mui/material';

export const StyledBasicAppBar = styled(AppBar)(({ theme }) => ({
  fontWeight: '600',
  background: theme.palette.primary.main,
  height: '75px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'row',
  color: theme.palette.text.primary,
  paddingLeft: '40px',
  paddingRight: '40px',
}));
