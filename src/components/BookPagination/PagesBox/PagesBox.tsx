import { Box, Button } from '@mui/material';
import { BookPaginationProps } from '../BookPagination';
import { Link } from '@tanstack/react-router';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export const PagesBox = ({ prev, next }: BookPaginationProps) => {
  return (
    <Box>
      {prev ? (
        <Link
          to="."
          search={(prev) => ({
            ...prev,
            page: (prev.page || 0) - 1,
          })}
        >
          <Button variant="contained" startIcon={<ArrowLeftIcon />}>
            Previous Page
          </Button>
        </Link>
      ) : null}
      {next ? (
        <Link
          to="."
          search={(prev) => ({
            ...prev,
            page: (prev.page || 0) + 1,
          })}
        >
          <Button variant="contained" endIcon={<ArrowRightIcon />}>
            Next Page
          </Button>
        </Link>
      ) : null}
    </Box>
  );
};
