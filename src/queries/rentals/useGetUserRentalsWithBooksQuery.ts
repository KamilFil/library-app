import { useQuery } from '@tanstack/react-query';
import { useApi } from '../../api/useApi.ts';
import { RentalWithBookEntity } from '../../types/rental.ts';

export const useGetUserRentalsWithBooksQuery = (userId: string) => {
  const { apiGet } = useApi();

  const { data, isFetching } = useQuery<RentalWithBookEntity[]>({
    queryKey: ['rentals', userId],
    queryFn: async () => {
      return apiGet<RentalWithBookEntity[]>(
        `rentals?userId=${userId}&_embed=book`,
      );
    },
    enabled: !!userId,
  });

  return {
    data,
    isFetching,
  };
};
