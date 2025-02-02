import { Table, TableBody, TableContainer, TableHead, Typography } from '@mui/material';
import { StyledTableCell, StyledTableRow } from './Logs.styled.tsx';
import { Pagination } from '../Pagination/Pagination.tsx';
import { useLoaderData } from '@tanstack/react-router';

export const Logs = () => {
  const { data, prev, next } = useLoaderData({ from: '/logs/' });

  if (!data) return <p>No logs.</p>;

  return (
    <>
      <Typography variant="h4" sx={{ textAlign: 'left', width: '100%', marginBottom: 2 }}>
        Logs
      </Typography>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="books-table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="left">ID</StyledTableCell>
              <StyledTableCell align="left">Data</StyledTableCell>
              <StyledTableCell align="left">Typ</StyledTableCell>
              <StyledTableCell align="left">Akcja</StyledTableCell>
              <StyledTableCell align="left">Wiadomość</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {data.map((log) => (
              <StyledTableRow
                key={log.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell align="left">{log.id}</StyledTableCell>
                <StyledTableCell align="left">{new Date(log.actionDate).toLocaleString('pl-PL')}</StyledTableCell>
                <StyledTableCell align="left">{log.type}</StyledTableCell>
                <StyledTableCell align="left">{log.typeAction}</StyledTableCell>
                <StyledTableCell align="left">{log.message ? log.message : '-'}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination prev={prev} next={next} />
    </>
  );
}