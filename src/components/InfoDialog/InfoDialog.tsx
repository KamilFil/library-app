import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { DialogType } from '../../types/dialog';

interface InfoDialogProps {
  open: boolean;
  handleDisagree: () => void;
  handleAgree?: () => void;
  type: DialogType;
  dialogTitle: string;
  dialogTitleId: string;
  dialogText: string;
  onClick?: () => void;
}

export const InfoDialog = ({
  open,
  handleDisagree,
  handleAgree,
  type,
  dialogTitle,
  dialogTitleId,
  dialogText,
}: InfoDialogProps) => {
  return (
    <Dialog open={open} onClose={handleDisagree}>
      <DialogTitle id={dialogTitleId}>{dialogTitle}</DialogTitle>
      <DialogContent>
        <Alert severity={type}>{dialogText}</Alert>
      </DialogContent>
      <DialogActions>
        <Button
          sx={type === DialogType.ERROR ? { color: 'red' } : {}}
          onClick={handleDisagree}
        >
          CLOSE
        </Button>
        {type !== DialogType.ERROR ? (
          <Button variant="contained" onClick={handleAgree}>
            OK
          </Button>
        ) : null}
      </DialogActions>
    </Dialog>
  );
};
