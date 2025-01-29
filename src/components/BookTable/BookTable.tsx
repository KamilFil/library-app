import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { AuthRole } from '../../types/auth';
import { BookEntity } from '../../types/book';

interface BookTableProps {
  books: BookEntity[];
  userType: AuthRole;
}

export const BookTable = ({ books, userType }: BookTableProps) => {
  return (
    <>
      <p>{userType}</p>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Author</TableCell>
              <TableCell align="right">Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow
                key={book.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="right">{book.title}</TableCell>
                <TableCell align="right">{book.author}</TableCell>
                <TableCell align="right">{book.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
