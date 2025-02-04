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
import { AuthRole } from '../../types/auth';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useNavigate } from '@tanstack/react-router';
import { useAuthStore } from '../../store/useAuthStore.ts';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

interface BookTableProps {
  books: BookEntity[];
}

export const BookTable = ({ books }: BookTableProps) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const onDetailsHandler = (id: string) => {
    navigate({ to: `/books/${id}` });
  };

  return (
    <>
      <Typography variant="h4">List of books</Typography>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="books-table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="left">Title</StyledTableCell>
              <StyledTableCell align="left">Author</StyledTableCell>
              <StyledTableCell align="left">Quantity</StyledTableCell>
              {[AuthRole.USER, AuthRole.ADMIN].includes(
                user?.role as AuthRole,
              ) && <StyledTableCell align="center">Actions</StyledTableCell>}
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
                <StyledTableCell align="center">
                  {[AuthRole.USER, AuthRole.ADMIN].includes(
                    user?.role as AuthRole,
                  ) && (
                    <Button onClick={() => onDetailsHandler(book.id)}>
                      <RemoveRedEyeIcon />
                    </Button>
                  )}
                  {user?.role === AuthRole.ADMIN ? (
                    <>
                      <Button onClick={() => onDetailsHandler(book.id)}>
                        <EditIcon color="info" />
                      </Button>
                      <Button onClick={() => onDetailsHandler(book.id)}>
                        <DeleteForeverIcon color="error" />
                      </Button>
                    </>
                  ) : null}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
