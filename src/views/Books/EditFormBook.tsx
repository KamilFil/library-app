import { Box, Button, Modal, Typography } from '@mui/material';
import { StyledTextField } from '../SignIn/components/styles/Form.styles.ts';
import { useForm } from 'react-hook-form';
import { BookEntity } from '../../types/book.ts';
import { usePutBookMutation } from '../../queries/books/usePutBookMutation.ts';
import { useRentedBookQuantityQuery } from '../../queries/rentals/useRentedBookQuantityQuery.ts';

interface EditFormBookInput {
  id?: string;
  title?: string;
  author?: string;
  description?: string;
  year?: number;
  quantity?: number;
}

interface EditFormBookProps {
  isOpen: boolean;
  handleClose: () => void;
  book: BookEntity | null;
}

export const EditFormBook = ({
  book,
  isOpen,
  handleClose,
}: EditFormBookProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditFormBookInput>();
  const { mutate } = usePutBookMutation();

  const { data: rentedBooks } = useRentedBookQuantityQuery(book?.id);

  const handleEditBook = (data: EditFormBookInput) => {
    mutate({ ...data, id: book?.id });
    handleClose();
  };

  return (
    <>
      {isOpen && (
        <Modal
          open={isOpen}
          onClose={handleClose}
          aria-labelledby="add-book-modal"
        >
          <Box
            component="form"
            onSubmit={handleSubmit(handleEditBook)}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              backgroundColor: 'background.paper',
              boxShadow: 24,
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 2,
            }}
          >
            <Typography variant="body1">Edit book</Typography>
            <StyledTextField
              type="text"
              sx={{ color: 'black' }}
              placeholder="Title"
              {...register('title', {
                value: book?.title,
                minLength: 3,
                maxLength: 20,
              })}
            />
            <StyledTextField
              type="text"
              sx={{ color: 'black' }}
              placeholder="Author"
              {...register('author', {
                value: book?.author,
                minLength: 3,
                maxLength: 20,
              })}
            />
            <StyledTextField
              type="text"
              sx={{ color: 'black' }}
              placeholder="Description"
              {...register('description', {
                value: book?.description,
                minLength: 5,
                maxLength: 200,
              })}
            />
            <StyledTextField
              type="number"
              sx={{ color: 'black' }}
              placeholder="Year"
              {...register('year', {
                value: book?.year,
                minLength: 4,
                maxLength: 4,
              })}
            />
            <StyledTextField
              type="number"
              sx={{ color: 'black' }}
              placeholder="Quantity"
              {...register('quantity', {
                value: book?.quantity,
                min: {
                  value: rentedBooks,
                  message: `You cannot set quantity below ${rentedBooks}`,
                },
                max: {
                  value: 100,
                  message: 'Quantity cannot be higher than 100',
                },
              })}
            />
            {errors.quantity?.message && (
              <Typography sx={{ color: 'red' }} variant="body2">
                {errors.quantity.message}
              </Typography>
            )}
            <Button variant="contained" type="submit">
              Update book
            </Button>
          </Box>
        </Modal>
      )}
    </>
  );
};
