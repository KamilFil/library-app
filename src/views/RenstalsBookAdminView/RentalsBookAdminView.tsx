import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Pagination } from '../../components/Pagination/Pagination.tsx';
import { useSearch } from '@tanstack/react-router';
import { useGetUserRentalsBooks } from '../../queries/rentals/useGetUserRentalsBooks.ts';
import { StyledTableCell, StyledTableRow } from '../Logs/Logs.styled.tsx';
import { isOverdueRental } from '../../utils/isOverdueRental.ts';

export const RentalsBookAdminView = () => {
  const search = useSearch({ from: '/admin/rentals/' });
  const page = Number(search.page ?? 1);
  const size = Number(search.size ?? 5);
  const { data, isFetching } = useGetUserRentalsBooks(page, size);

  if (isFetching) return <p>Loading...</p>;
  if (!data) return <p>No logs.</p>;

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
              <StyledTableCell align="left">Username</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((rentals) => (
              <StyledTableRow
                key={rentals.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell align="left">{rentals.id}</StyledTableCell>
                <StyledTableCell align="left">
                  {rentals?.book ? rentals.book.title : 'Brak książki'}
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    backgroundColor: isOverdueRental(rentals).isOverdue
                      ? 'red'
                      : '',
                  }}
                  align="left"
                >
                  {rentals.rentedAt}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {rentals?.user
                    ? `${rentals.user.firstName} ${rentals.user.lastName}`
                    : 'Użytkownik usunięty'}{' '}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        prev={page > 1 ? page - 1 : null}
        next={data.length === size ? page + 1 : null}
      />
    </>
  );
};
