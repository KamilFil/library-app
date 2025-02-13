import { Button, Typography } from '@mui/material';
import { BookEntity } from '../../../types/book';
import {
  StyledBackButton,
  StyledSingleBookBox,
  StyledSingleBookContainer,
} from './SingleBook.styled';
import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useCreateRentalMutation } from '../../../queries/rentals/useCreateRentalMutation';
import { usePutBookMutation } from '../../../queries/books/usePutBookMutation';
import { InfoDialog } from '../../InfoDialog/InfoDialog';
import { DialogType } from '../../../types/dialog';
import { useAuthStore } from '../../../store/useAuthStore';

interface SingleBookProps {
  data: BookEntity;
}

export const SingleBook = ({ data }: SingleBookProps) => {
  const { mutate: rentalMutate, isPending: rentalPending } =
    useCreateRentalMutation();
  const { mutate: bookMutate, isPending: bookPending } = usePutBookMutation(
    data.id,
  );
  const { user } = useAuthStore();
  const [isOpenModal, setOpenModal] = useState(false);
  const [isNoBookOpenModal, setNoBookOpenModal] = useState(false);
  const navigate = useNavigate();

  if (!user) return <p>No user.</p>;

  const handleBack = () => {
    navigate({ to: '..' });
  };

  const handleDisagree = () => {
    setOpenModal(false);
  };
  const handleNoBookDisagree = () => {
    setNoBookOpenModal(false);
  };

  const handleAgree = () => {
    handleRentBook(data.id, data.quantity);
    setOpenModal(false);
  };

  const handleRentBook = (bookId: string, bookQuantity: number) => {
    rentalMutate({
      userId: user.id,
      bookId,
      rentedAt: new Date().toLocaleDateString(),
      returnedAt: null,
    });

    bookMutate({
      ...data,
      quantity: bookQuantity - 1,
    });

    if (rentalPending || bookPending) return <p>Loading...</p>;

    handleBack();
  };

  const onRentBookHandler = () => {
    if (data.quantity > 0) {
      setOpenModal(true);
    } else {
      setNoBookOpenModal(true);
    }
  };

  return (
    <>
      <StyledBackButton onClick={handleBack} startIcon={<ArrowBackIcon />}>
        BACK
      </StyledBackButton>
      <StyledSingleBookContainer>
        <StyledSingleBookBox>
          <p>Title: </p>
          <Typography variant="h6">{data.title}</Typography>
        </StyledSingleBookBox>
        <StyledSingleBookBox>
          <p>Author: </p>
          <Typography variant="h6">{data.author}</Typography>
        </StyledSingleBookBox>
        <StyledSingleBookBox>
          <p>Year: </p>
          <Typography variant="h6">{data.year}</Typography>
        </StyledSingleBookBox>
        <StyledSingleBookBox>
          <p>Quantity: </p>
          <Typography variant="h6">{data.quantity}</Typography>
        </StyledSingleBookBox>
        <StyledSingleBookBox>
          <p>Description: </p>
          <Typography variant="h6">{data.description}</Typography>
        </StyledSingleBookBox>
        <Button variant="contained" onClick={onRentBookHandler}>
          Rent a book
        </Button>
      </StyledSingleBookContainer>
      <InfoDialog
        open={isOpenModal}
        handleDisagree={handleDisagree}
        handleAgree={handleAgree}
        type={DialogType.INFO}
        dialogTitle={'Book rental'}
        dialogTitleId={`${data.id}-book-rental-avilable`}
        dialogText={'Are you sure you want to rent this book?'}
      />
      <InfoDialog
        open={isNoBookOpenModal}
        handleDisagree={handleNoBookDisagree}
        type={DialogType.ERROR}
        dialogTitle={'Book rental'}
        dialogTitleId={`${data.id}-book-rental-unavailable`}
        dialogText={'There is no available copy of this book!'}
      />
    </>
  );
};
