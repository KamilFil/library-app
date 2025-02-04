import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { InfoDialog } from '../../InfoDialog/InfoDialog';
import { DialogType } from '../../../types/dialog';
import { useAuthStore } from '../../../store/useAuthStore';
import { useState } from 'react';
import { useGetUserRentalsWithBooksQuery } from '../../../queries/rentals/useGetUserRentalsWithBooksQuery';
import { useArchiveUserMutation } from '../../../queries/users/useArchiveUserMutation';
import { useAuth } from '../../../hooks/useAuth';

export const DeleteUser = () => {
  const { user } = useAuthStore();
  const { data: rentals, isFetching } = useGetUserRentalsWithBooksQuery(
    user!.id,
  );
  const { logout } = useAuth();
  const [isOpenModal, setOpenModal] = useState(false);
  const [isNoDeleteOpenModal, setNoDeleteOpenModal] = useState(false);

  const { mutate: archiveMutation, isPending: isPendingDeletion } =
    useArchiveUserMutation(user!.id);

  if (!user) return <p>User error</p>;

  if (!rentals) return <p>No data...</p>;

  if (isFetching) return <p>Loading</p>;

  const rentedBooks = rentals.filter(
    (rental) => rental.returnedAt === null,
  ).length;

  const handleDisagree = () => {
    setOpenModal(false);
  };

  const handleNoDeleteDisagree = () => {
    setNoDeleteOpenModal(false);
  };

  const onDeleteHandler = () => {
    if (rentedBooks !== 0) {
      setNoDeleteOpenModal(true);
    } else {
      setOpenModal(true);
    }
  };

  const handleAgree = () => {
    archiveMutation({
      isDeleted: true,
    });
    if (isPendingDeletion) return <p>Deletion in progress...</p>;
    setOpenModal(false);
    logout();
  };

  return (
    <>
      <Button
        onClick={() => onDeleteHandler()}
        startIcon={<DeleteIcon />}
        variant="contained"
        sx={{ backgroundColor: 'red' }}
      >
        Delete
      </Button>

      <InfoDialog
        open={isOpenModal}
        handleDisagree={handleDisagree}
        handleAgree={handleAgree}
        type={DialogType.WARNING}
        dialogTitle={'User deletion'}
        dialogTitleId={`${user.id}-deletion-avilable`}
        dialogText={'Are you sure you want to delete this account?'}
      />

      <InfoDialog
        open={isNoDeleteOpenModal}
        handleDisagree={handleNoDeleteDisagree}
        type={DialogType.ERROR}
        dialogTitle={'User deletion'}
        dialogTitleId={`${user.id}-deletion-unavailable`}
        dialogText={'You have to return all rented books before this action!'}
      />
    </>
  );
};
