import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Typography,
} from '@mui/material';
import { StyledTableCell, StyledTableRow } from './Logs.styled.tsx';
import { Pagination } from '../../components/Pagination/Pagination.tsx';
import { useSearch } from '@tanstack/react-router';
import { useGetLogsQuery } from '../../queries/logs/useGetLogsQuery.ts';

export const Logs = () => {
  const search = useSearch({ from: '/admin/logs/' });
  const page = Number(search.page ?? 1);
  const size = Number(search.size ?? 5);
  const { data, isFetching } = useGetLogsQuery(page, size);

  if (!data) return <p>No logs found.</p>;
  if (isFetching) return <p>Loading logs...</p>;

  return (
    <>
      <Typography
        variant="h4"
        sx={{ textAlign: 'left', width: '100%', marginBottom: 2 }}
      >
        Logs
      </Typography>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="books-table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="left">ID</StyledTableCell>
              <StyledTableCell align="left">Date</StyledTableCell>
              <StyledTableCell align="left">Email</StyledTableCell>
              <StyledTableCell align="left">Type</StyledTableCell>
              <StyledTableCell align="left">Action Type</StyledTableCell>
              <StyledTableCell align="left">Messages</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {data.data.map((log) => (
              <StyledTableRow
                key={log.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell align="left">{log.id}</StyledTableCell>
                <StyledTableCell align="left">
                  {new Date(log.actionDate).toLocaleString('pl-PL')}
                </StyledTableCell>
                <StyledTableCell align="left">{log.userEmail}</StyledTableCell>
                <StyledTableCell align="left">{log.type}</StyledTableCell>
                <StyledTableCell align="left">{log.typeAction}</StyledTableCell>
                <StyledTableCell align="left">
                  {log.message ? log.message : '-'}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        prev={page > 1 ? page - 1 : null}
        next={data.items > size * page ? page + 1 : null}
      />
    </>
  );
};
