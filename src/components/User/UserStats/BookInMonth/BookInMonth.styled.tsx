import { FormControl, styled } from '@mui/material';

export const StyledFormControl = styled(FormControl)({
  m: 1,
  minWidth: 120,
  color: 'black',
  [`& .MuiSelect-select`]: { color: 'black' },
});
