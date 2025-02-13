import { Alert, Snackbar } from '@mui/material';
import { useNotificationStore } from '../../store/useNotificationStore.ts';

export const Notification = () => {
  const { isOpen, type, message, closeNotification } = useNotificationStore();

  return (
    <Snackbar
      sx={{ width: '100%' }}
      open={isOpen}
      onClose={closeNotification}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={closeNotification} severity={type} sx={{ width: '50%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
