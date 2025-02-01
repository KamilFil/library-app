import { createFileRoute } from '@tanstack/react-router';
import { useGetBookQuery } from '../../queries/books/useGetBookQuery';
import { CircularProgress } from '@mui/material';
import { SingleBook } from '../../components/BookTable/SingleBook/SingleBook';
import { authGuard } from '../../auth/authGuard.ts';

const SingleBookView = () => {
  const params = Route.useParams();
  const { data, isFetching } = useGetBookQuery(params.bookId);

  if (isFetching) return <CircularProgress />;

  if (!data) return <p>No category.</p>;

  return <SingleBook data={data} />;
};

export const Route = createFileRoute('/books/$bookId')({
  component: SingleBookView,
  beforeLoad: async () => authGuard(),
});
