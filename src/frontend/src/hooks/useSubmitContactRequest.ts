import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { toast } from 'sonner';

interface SubmitRequestParams {
  name: string;
  email: string;
  message: string;
}

export function useSubmitContactRequest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: SubmitRequestParams) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitContactRequest(params.name, params.email, params.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requests'] });
      toast.success('Request submitted successfully!');
    },
    onError: (error: Error) => {
      toast.error('Failed to submit request. Please try again.');
      console.error('Submit request error:', error);
    }
  });
}

