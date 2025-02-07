import { useQuery } from '@tanstack/react-query';
import { PaginatedRentalsEntity } from '../../types/rental.ts';
import { useApi } from '../../api/useApi.ts';

export const useGetUserRentalsBooks = (page: number = 1, size: number = 10) => {
  const { apiGet } = useApi();

  const { data, isFetching, error } = useQuery<PaginatedRentalsEntity, Error>({
    queryKey: ['rentals', page, size],
    queryFn: async (): Promise<PaginatedRentalsEntity> => {
      return apiGet<PaginatedRentalsEntity>(
        `rentals?_page=${page}&_per_page=${size}&_embed=user&_embed=book`,
      );
    },
  });
  return {
    data,
    isFetching,
    error,
  };
};
