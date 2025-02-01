import { Button, Typography } from '@mui/material';
import { StyledButtonGroup } from './RecordsBox.styled';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';

export const RecordsBox = () => {
  const recordsPerPageArray = [5, 10, 25];
  const [pageSize, setPageSize] = useState<number>(recordsPerPageArray[0]);

  return (
    <StyledButtonGroup variant="text" aria-label="Basic button group">
      <Typography>Rows per page:</Typography>
      {recordsPerPageArray.map((record, index) => (
        <Link
          key={index}
          to={'.'}
          search={(prev) => ({
            ...prev,
            page: 1,
            size: record,
          })}
        >
          <Button onClick={() => setPageSize(record)}>
            {pageSize === record ? <strong>{record}</strong> : record}
          </Button>
        </Link>
      ))}
    </StyledButtonGroup>
  );
};
