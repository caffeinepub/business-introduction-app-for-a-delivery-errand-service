import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { ContactRequest, UserProfile, UserRole } from '../backend';
import { toast } from 'sonner';

export function useGetAllRequests() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<ContactRequest[]>({
    queryKey: ['requests', 'all'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllRequests();
    },
    enabled: !!actor && !actorFetching,
    retry: false
  });
}

export function useGetRequestById(requestId: bigint | null) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<ContactRequest>({
    queryKey: ['requests', 'detail', requestId?.toString()],
    queryFn: async () => {
      if (!actor || !requestId) throw new Error('Actor or request ID not available');
      return actor.getRequestById(requestId);
    },
    enabled: !!actor && !actorFetching && requestId !== null,
    retry: false
  });
}

export function useGetCallerUserRole() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<UserRole>({
    queryKey: ['userRole'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserRole();
    },
    enabled: !!actor && !actorFetching,
    retry: false
  });
}

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
      toast.success('Profile saved successfully!');
    },
    onError: (error: Error) => {
      toast.error('Failed to save profile. Please try again.');
      console.error('Save profile error:', error);
    }
  });
}

