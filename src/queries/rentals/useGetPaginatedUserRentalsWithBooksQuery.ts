import { useQuery } from '@tanstack/react-query';
import { useApi } from '../../api/useApi.ts';
import { PaginatedUserRentalsEntity } from '../../types/rental.ts';

export const useGetPaginatedUserRentalsWithBooksQuery = (
  page: number,
  size: number,
  userId: string,
) => {
  const { apiGet } = useApi();

  const { data, isFetching } = useQuery<PaginatedUserRentalsEntity>({
    queryKey: ['rentals', page, size, userId],
    queryFn: async () => {
      return apiGet<PaginatedUserRentalsEntity>(
        `rentals?_page=${page}&_per_page=${size}&userId=${userId}&_embed=book`,
      );
    },
    enabled: !!userId,
  });

  return {
    data,
    isFetching,
  };
};
