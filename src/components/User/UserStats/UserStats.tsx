import { Box, Typography } from '@mui/material';
import { RentalWithBookEntity } from '../../../types/rental';
import { rentalStatusCounter } from '../../../utils/rentalStatusCounter';
import { BookInMonth } from './BookInMonth/BookInMonth';
import { StyledUserStatsBox } from './UserStats.styled';

interface UserStatsProps {
  data: RentalWithBookEntity[];
}

export const UserStats = ({ data }: UserStatsProps) => {
  const noNullData = data.filter((rental) => rental.userId !== null);
  const onTimeBooks = rentalStatusCounter(noNullData, false);
  const delayedBooks = rentalStatusCounter(noNullData, true);
  const rentedBooks = noNullData.filter(
    (rental) => rental.returnedAt === null,
  ).length;

  return (
    <StyledUserStatsBox>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '10px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4">My stats</Typography>
      </Box>
      <BookInMonth data={noNullData} />
      <Typography variant="h6">
        All books returned on time: <strong>{onTimeBooks}</strong>
      </Typography>
      <Typography variant="h6">
        All books returned after deadline: <strong>{delayedBooks}</strong>
      </Typography>
      <Typography variant="h6">
        All Books already rented: <strong>{rentedBooks}</strong>
      </Typography>
    </StyledUserStatsBox>
  );
};
