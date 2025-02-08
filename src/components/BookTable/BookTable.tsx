import {
  Box,
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
import { InfoDialog } from '../InfoDialog/InfoDialog.tsx';
import { DialogType } from '../../types/dialog.ts';
import { useState } from 'react';
import { useDeleteBookMutation } from '../../queries/books/useDeleteBookMutation.ts';
import { AddBookForm } from '../../views/Books/AddBookForm.tsx';
import { EditFormBook } from '../../views/Books/EditFormBook.tsx';

interface BookTableProps {
  books: BookEntity[];
}

export const BookTable = ({ books }: BookTableProps) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [isOpenModal, setOpenModal] = useState(false);
  const { mutate } = useDeleteBookMutation();
  const [bookState, setBookState] = useState<BookEntity | null>(null);

  const handleDisagree = () => {
    setOpenModal(false);
  };
  const handleDelete = (bookId: string) => {
    mutate(bookId);
    setOpenModal(false);
  };

  const onDeleteHandler = (bookId: string) => {
    setOpenModal(true);
    handleDelete(bookId);
  };

  const onDetailsHandler = (id: string) => {
    navigate({ to: `/books/${id}` });
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          paddingBottom: 2,
        }}
      >
        <Typography variant="h4">List of books</Typography>
        {user?.role === AuthRole.ADMIN && <AddBookForm />}
      </Box>
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
                      <Button onClick={() => setBookState(book)}>
                        <EditIcon color="info" />
                      </Button>

                      <Button onClick={() => onDeleteHandler(book.id)}>
                        <DeleteForeverIcon color="error" />
                      </Button>
                    </>
                  ) : null}
                  <EditFormBook
                    book={bookState}
                    isOpen={bookState?.id === book.id}
                    handleClose={() => setBookState(null)}
                  />
                  <InfoDialog
                    open={isOpenModal}
                    handleDisagree={handleDisagree}
                    type={DialogType.INFO}
                    dialogTitle={'Book delete'}
                    dialogTitleId={`${book.id}-book-remove-avilable`}
                    dialogText={'Are you sure you want to delete  this book?'}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
