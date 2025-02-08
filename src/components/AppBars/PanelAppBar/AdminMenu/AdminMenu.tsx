import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import HistoryIcon from '@mui/icons-material/History';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { useNavigate } from '@tanstack/react-router';

export const AdminMenu = () => {
  const navigate = useNavigate();

  return (
    <>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() =>
              navigate({ to: '/books', search: { page: 1, size: 5 } })
            }
          >
            <ListItemIcon>
              <LibraryBooksIcon />
            </ListItemIcon>
            <ListItemText primary={'Books'} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() =>
              navigate({ to: '/admin/rentals', search: { page: 1, size: 5 } })
            }
          >
            <ListItemIcon>
              <AutoStoriesIcon />
            </ListItemIcon>
            <ListItemText primary={'Rentals'} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() =>
              navigate({ to: '/admin/logs', search: { page: 1, size: 5 } })
            }
          >
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary={'Logs'} />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
};
