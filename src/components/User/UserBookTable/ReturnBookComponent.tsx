import { Button } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { RentalWithBookEntity } from '../../../types/rental';
import { useReturnRentalMutation } from '../../../queries/rentals/useReturnRentalMutation';
import { usePutBookMutation } from '../../../queries/books/usePutBookMutation';
import { InfoDialog } from '../../InfoDialog/InfoDialog';
import { DialogType } from '../../../types/dialog';

interface RecordBookComponentProps {
  record: RentalWithBookEntity;
}

export const ReturnBookComponent = ({ record }: RecordBookComponentProps) => {
  const { mutate: rentalMutate, isPending: isRentalPending } =
    useReturnRentalMutation(record.id);
  const { mutate: bookMutate, isPending: isBookPending } = usePutBookMutation(
    record.bookId,
  );
  const [isOpenModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const handleDisagree = () => {
    setOpenModal(false);
  };

  const handleAgree = () => {
    bookMutate({
      ...record.book!,
      quantity: record.book!.quantity + 1,
    });

    if (isBookPending) return <p>Loading...</p>;

    rentalMutate({
      userId: record.userId,
      bookId: record.bookId,
      rentedAt: record.rentedAt,
      returnedAt: new Date().toLocaleDateString(),
    });

    if (isRentalPending) return <p>Loading...</p>;

    setOpenModal(false);

    navigate({ to: '..' });
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpenModal(true)}>
        Return
      </Button>
      <InfoDialog
        open={isOpenModal}
        handleDisagree={handleDisagree}
        handleAgree={handleAgree}
        type={DialogType.INFO}
        dialogTitle={'Book return'}
        dialogTitleId={`${record.bookId}-book-return-avilable`}
        dialogText={'Are you sure you want to return this book?'}
      />
    </>
  );
};
