import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { Pagination } from '../../components/Pagination/Pagination.tsx';
import { useSearch } from '@tanstack/react-router';
import { useGetUserRentalsBooks } from '../../queries/rentals/useGetUserRentalsBooks.ts';
import { StyledTableCell, StyledTableRow } from '../Logs/Logs.styled.tsx';
import { isOverdueRental } from '../../utils/isOverdueRental.ts';
import FmdBadIcon from '@mui/icons-material/FmdBad';
import GppGoodIcon from '@mui/icons-material/GppGood';
import { ReturnBookComponent } from '../../components/User/UserBookTable/ReturnBookComponent.tsx';

export const RentalsBookAdminView = () => {
  const search = useSearch({ from: '/admin/rentals/' });
  const page = Number(search.page ?? 1);
  const size = Number(search.size ?? 5);
  const { data, isFetching } = useGetUserRentalsBooks(page, size);

  if (isFetching) return <p>Loading...</p>;
  if (!data) return <p>No logs.</p>;

  const { data: rentBook } = data;

  return (
    <>
      <Typography
        variant="h4"
        sx={{ textAlign: 'left', width: '100%', marginBottom: 2 }}
      >
        Rentals books
      </Typography>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="books-table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">ID</StyledTableCell>
              <StyledTableCell align="left">Book title</StyledTableCell>
              <StyledTableCell align="left">Rented at</StyledTableCell>
              <StyledTableCell align="left">Returned at</StyledTableCell>
              <StyledTableCell align="left">Username</StyledTableCell>
              <StyledTableCell align="left">CardID</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rentBook.map((rentals) => (
              <StyledTableRow
                key={rentals.id}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <StyledTableCell align="left">{rentals.id}</StyledTableCell>
                <StyledTableCell align="left">
                  {rentals?.book ? rentals.book.title : 'Brak książki'}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {rentals.rentedAt}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {rentals.returnedAt ?? 'Rented'}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {rentals?.user
                    ? `${rentals.user.firstName} ${rentals.user.lastName}`
                    : 'Użytkownik usunięty'}{' '}
                </StyledTableCell>
                <StyledTableCell>
                  {rentals?.user ? rentals.user.cardId : 'Brak karty'}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {isOverdueRental(rentals).daysDifference ? (
                    <Tooltip
                      title={`Opóźnione o ${isOverdueRental(rentals).daysDifference} dni`}
                    >
                      <span>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <FmdBadIcon color="error" />
                          {rentals.returnedAt !== null ? 'Returned' : 'Rented'}
                        </Box>
                      </span>
                    </Tooltip>
                  ) : (
                    <Tooltip title={`Brak opóźnienia`}>
                      <span>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <GppGoodIcon color="success" />
                          {rentals.returnedAt !== null ? 'Returned' : 'Rented'}
                        </Box>
                      </span>
                    </Tooltip>
                  )}
                </StyledTableCell>
                {rentals.returnedAt === null &&
                isOverdueRental(rentals).isOverdue ? (
                  <StyledTableCell align={'center'}>
                    <ReturnBookComponent record={rentals} />
                  </StyledTableCell>
                ) : null}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        prev={page > 1 ? page - 1 : null}
        next={data.items > size * page ? page + 1 : null}
      />
    </>
  );
};
