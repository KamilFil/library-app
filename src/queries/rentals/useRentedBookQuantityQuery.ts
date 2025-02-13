import { useQuery } from '@tanstack/react-query';
import { useApi } from '../../api/useApi.ts';
import { RentalEntity } from '../../types/rental.ts';

export const useRentedBookQuantityQuery = (bookId?: string) => {
  const { apiGet } = useApi();

  const { data, isFetching } = useQuery<RentalEntity[] | []>({
    queryKey: ['rentals', 'quantity', bookId],
    queryFn: async () => {
      return apiGet<RentalEntity[]>(`rentals?bookId=${bookId}`);
    },
    enabled: !!bookId,
  });

  return {
    data: data?.length ?? 0,
    isFetching,
  };
};
