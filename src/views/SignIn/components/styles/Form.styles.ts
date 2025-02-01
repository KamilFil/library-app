import { Box, BoxProps, styled, TextField } from '@mui/material';

export const StyledBox = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0 0 10px black',
  padding: theme.spacing(2),
  width: '30%',
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  color: 'black',
  marginBottom: theme.spacing(2),
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '& input': {
      color: 'black',
    },
  },
}));
