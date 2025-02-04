import { styled, TableCell, tableCellClasses, TableRow } from '@mui/material';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: 'bold',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: theme.palette.common.black,
  },
}));

export const StyledTableRow = styled(TableRow)({
  '&:last-child td, &:last-child th': {
    border: 0,
  },
});
