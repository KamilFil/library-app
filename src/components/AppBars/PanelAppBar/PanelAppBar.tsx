import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import {
  StyledPanelAppBarBox,
  StyledPanelAppBarDrawer,
  StyledPanelAppBarUserDataBox,
} from './PanelAppBar.styled';
import { useAuthStore } from '../../../store/useAuthStore';
import { Button, Typography } from '@mui/material';
import { LogoBox } from '../GuestAppBar/LogoBox/LogoBox';
import { AuthRole } from '../../../types/auth';
import { UserMenu } from './UserMenu/UserMenu';
import { AdminMenu } from './AdminMenu/AdminMenu';
import { useAuth } from '../../../hooks/useAuth';
import LogoutIcon from '@mui/icons-material/Logout';
import { DeleteUser } from '../../User/DeleteUser/DeleteUser';

export const PanelAppBar = () => {
  const { user } = useAuthStore();
  const { logout } = useAuth();

  if (!user) return <p>No user</p>;

  const handleLogout = () => {
    logout();
  };

  return (
    <StyledPanelAppBarBox sx={{ display: 'flex', zIndex: '0' }}>
      <CssBaseline />
      <StyledPanelAppBarDrawer variant="permanent">
        <Box sx={{ overflow: 'auto' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <StyledPanelAppBarUserDataBox>
              <LogoBox />
            </StyledPanelAppBarUserDataBox>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '32px 16px',
                gap: '10px',
                justifyContent: 'center',
                alignItems: 'flex-start',
                width: '100%',
              }}
            >
              <Typography variant="h6">Welcome,</Typography>
              <Typography>
                <strong>{user.email}</strong>
              </Typography>
              <Typography>
                CardId: <strong>{user.cardId}</strong>
              </Typography>
              <Typography>
                Role: <strong>{user.role}</strong>
              </Typography>
            </Box>
          </Box>
          <Divider />
          {user.role === AuthRole.USER ? <UserMenu /> : null}
          {user.role === AuthRole.ADMIN ? <AdminMenu /> : null}
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginBottom: '50px',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <Button
            startIcon={<LogoutIcon />}
            onClick={() => handleLogout()}
            variant="outlined"
            sx={{ color: 'red', borderColor: 'red' }}
          >
            Logout
          </Button>
          {user.role === AuthRole.ADMIN ? null : <DeleteUser />}
        </Box>
      </StyledPanelAppBarDrawer>
    </StyledPanelAppBarBox>
  );
};
