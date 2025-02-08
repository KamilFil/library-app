import { Box, Button, Modal, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyledTextField } from '../SignIn/components/styles/Form.styles.ts';
import { useCreateBookMutation } from '../../queries/books/useCreateBookMutation.ts';

interface AddBookFormInput {
  title: string;
  author: string;
  description: string;
  year: number;
  quantity: number;
}

export const AddBookForm = () => {
  const { mutate } = useCreateBookMutation();
  const [isOpenModal, setOpenModal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddBookFormInput>();

  const handleAddBook = (data: AddBookFormInput) => {
    mutate(data);
    setOpenModal(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenModal((isOpenModal) => !isOpenModal)}
      >
        Add book
      </Button>
      {isOpenModal ? (
        <Modal
          open={isOpenModal}
          onClose={() => setOpenModal((isOpenModal) => !isOpenModal)}
          aria-labelledby="add-book-modal"
        >
          <Box
            component="form"
            onSubmit={handleSubmit(handleAddBook)}
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
            <Typography variant="body1">Added book</Typography>
            <StyledTextField
              type="text"
              sx={{ color: 'black' }}
              placeholder="Title"
              {...register('title', {
                required: true,
                minLength: 3,
                maxLength: 20,
              })}
            />
            {errors.title && (
              <Typography sx={{ color: 'red' }} variant="body2">
                Title is required
              </Typography>
            )}
            <StyledTextField
              type="text"
              sx={{ color: 'black' }}
              placeholder="Author"
              {...register('author', {
                required: true,
                minLength: 3,
                maxLength: 20,
              })}
            />
            {errors.author && (
              <Typography sx={{ color: 'red' }} variant="body2">
                Author is required
              </Typography>
            )}
            <StyledTextField
              type="text"
              sx={{ color: 'black' }}
              placeholder="Description"
              {...register('description', {
                required: true,
                minLength: 5,
                maxLength: 200,
              })}
            />
            {errors.description && (
              <Typography sx={{ color: 'red' }} variant="body2">
                Description is required
              </Typography>
            )}
            <StyledTextField
              type="number"
              sx={{ color: 'black' }}
              placeholder="Year"
              {...register('year', {
                required: true,
                minLength: 4,
                maxLength: 4,
              })}
            />
            {errors.year && (
              <Typography sx={{ color: 'red' }} variant="body2">
                Year is required
              </Typography>
            )}
            <StyledTextField
              type="number"
              sx={{ color: 'black' }}
              placeholder="Quantity"
              {...register('quantity', { required: true, maxLength: 5 })}
            />
            {errors.quantity && (
              <Typography sx={{ color: 'red' }} variant="body2">
                Quantity is required
              </Typography>
            )}
            <Button variant="contained" type="submit">
              Add book
            </Button>
          </Box>
        </Modal>
      ) : null}
    </>
  );
};
