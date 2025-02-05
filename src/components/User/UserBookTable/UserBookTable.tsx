import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Typography,
} from '@mui/material';

import { ReturnBookComponent } from './ReturnBookComponent';
import { RentalWithBookEntity } from '../../../types/rental';
import {
  StyledTableCell,
  StyledTableRow,
} from '../../BookTable/BookTable.styled';

interface UserBookTableProps {
  data: RentalWithBookEntity[];
}

export const UserBookTable = ({ data }: UserBookTableProps) => {
  return (
    <>
      <Typography variant="h4">My books</Typography>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="user-books-table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="left">Title</StyledTableCell>
              <StyledTableCell align="left">Author</StyledTableCell>
              <StyledTableCell align="left">Rented At</StyledTableCell>
              <StyledTableCell align="left">Returned At</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {data.map((record) => (
              <StyledTableRow
                key={record.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell align="left">
                  {record.book.title}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {record.book.author}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {record.rentedAt}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {record.returnedAt === null ? (
                    <ReturnBookComponent record={record} />
                  ) : (
                    record.rentedAt
                  )}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
