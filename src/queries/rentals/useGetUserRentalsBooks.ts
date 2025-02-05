import { useQuery } from '@tanstack/react-query';
import { PaginatedRentalsEntity, RentalEntity } from '../../types/rental.ts';
import { useApi } from '../../api/useApi.ts';

export const useGetUserRentalsBooks = (page: number = 1, size: number = 10) => {
  const { apiGet } = useApi();

  const { data, isFetching, error } = useQuery<RentalEntity[], Error>({
    queryKey: ['rentals', page, size],
    queryFn: async (): Promise<RentalEntity[]> => {
      const resp = await apiGet<PaginatedRentalsEntity>(
        `rentals?_page=${page}&_per_page=${size}&_embed=user&_embed=book`,
      );
      return resp.data;
    },
  });
  return {
    data,
    isFetching,
    error,
  };
};
