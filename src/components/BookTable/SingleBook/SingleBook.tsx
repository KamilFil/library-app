import { Button, Typography } from '@mui/material';
import { BookEntity } from '../../../types/book';
import {
  StyledBackButton,
  StyledSingleBookBox,
  StyledSingleBookContainer,
} from './SingleBook.styled';
import { useContext } from 'react';
import { useNavigate } from '@tanstack/react-router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useCreateRentalMutation } from '../../../queries/rentals/useCreateRentalMutation';
import { usePutBookMutation } from '../../../queries/books/usePutBookQuery';
import { UserRoleContext } from '../../context/UserRoleContext';

interface SingleBookProps {
  data: BookEntity;
}

export const SingleBook = ({ data }: SingleBookProps) => {
  const { user } = useContext(UserRoleContext);
  const { mutate: rentalMutate, isPending: rentalPending } =
    useCreateRentalMutation();
  const { mutate: bookMutate, isPending: bookPending } = usePutBookMutation(
    data.id,
  );
  const navigate = useNavigate();

  const handleBack = () => {
    navigate({ to: '..' });
  };

  const handleRentBook = (bookId: string, bookQuantity: number) => {
    if (data.quantity < 1) {
      return;
    }
    //dodanie do rental,
    rentalMutate({
      userId: user.id,
      bookId: bookId,
      rentedAt: new Date().toLocaleDateString(),
    });

    if (rentalPending) return <p>Loading...</p>;

    //zmiana quantity w książkach
    bookMutate({
      ...data,
      quantity: bookQuantity - 1,
    });

    if (bookPending) return <p>Loading...</p>;
    //dodanie loga

    //powrót na stronę główną
    handleBack();
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
        <Button
          variant="contained"
          onClick={() => handleRentBook(data.id, data.quantity)}
        >
          Rent a book
        </Button>
      </StyledSingleBookContainer>
    </>
  );
};
