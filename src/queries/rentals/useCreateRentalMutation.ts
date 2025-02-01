import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RentalDto, RentalEntity } from '../../types/rental.ts';
import { useApi } from '../../api/useApi.ts';

export const useCreateRentalMutation = () => {
  const { apiPost } = useApi();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ['rentals', 'create'],
    mutationFn: async (payload: RentalDto) => {
      return apiPost<RentalEntity, RentalDto>('rentals', payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['rentals'],
      });
    },
  });

  return {
    mutate,
    isPending,
  };
};
