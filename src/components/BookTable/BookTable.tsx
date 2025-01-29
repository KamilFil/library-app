import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Typography,
} from '@mui/material';
import { BookEntity } from '../../types/book';
import { StyledTableCell, StyledTableRow } from './BookTable.styled';

interface BookTableProps {
  books: BookEntity[];
}

export const BookTable = ({ books }: BookTableProps) => {
  return (
    <>
      <Typography variant="h4">List of books</Typography>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="left">Title</StyledTableCell>
              <StyledTableCell align="left">Author</StyledTableCell>
              <StyledTableCell align="left">Quantity</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <StyledTableRow
                key={book.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell align="left">{book.title}</StyledTableCell>
                <StyledTableCell align="left">{book.author}</StyledTableCell>
                <StyledTableCell align="left">{book.quantity}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
