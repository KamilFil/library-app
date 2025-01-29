import {
  Button,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Typography,
} from '@mui/material';
import { BookEntity } from '../../types/book';
import { StyledTableCell, StyledTableRow } from './BookTable.styled';
import { useContext } from 'react';
import { AuthRole } from '../../types/auth';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useNavigate } from '@tanstack/react-router';
import { UserRoleContext } from '../context/UserRoleContext';

interface BookTableProps {
  books: BookEntity[];
}

export const BookTable = ({ books }: BookTableProps) => {
  const navigate = useNavigate();
  const { user } = useContext(UserRoleContext);

  const onDetailsHandler = (id: string) => {
    navigate({ to: `/books/${id}` });
  };

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
              {user.role === AuthRole.USER ? (
                <StyledTableCell align="left">Details</StyledTableCell>
              ) : null}
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
                {user.role === AuthRole.USER ? (
                  <StyledTableCell align="left">
                    <Button onClick={() => onDetailsHandler(book.id)}>
                      <RemoveRedEyeIcon />
                    </Button>
                  </StyledTableCell>
                ) : null}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
