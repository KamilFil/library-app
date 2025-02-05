import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import StarIcon from '@mui/icons-material/Star';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { useNavigate } from '@tanstack/react-router';

export const UserMenu = () => {
  const navigate = useNavigate();

  const handlerAllBooks = () => {
    navigate({ to: '/books', search: { page: 1, size: 5 } });
  };

  const handlerMyBooks = () => {
    navigate({ to: '/user/my_books', search: { page: 1, size: 5 } });
  };

  const handlerMyStats = () => {
    navigate({ to: '/user/my_stats' });
  };

  return (
    <>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handlerAllBooks}>
            <ListItemIcon>
              <LibraryBooksIcon />
            </ListItemIcon>
            <ListItemText primary={'All books'} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={handlerMyBooks}>
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText primary={'My books'} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={handlerMyStats}>
            <ListItemIcon>
              <QueryStatsIcon />
            </ListItemIcon>
            <ListItemText primary={'My stats'} />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
};
