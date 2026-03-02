'use client';

import { getCurrentUser } from '@/services/auth';
import { useQuery } from '@tanstack/react-query';

export function useCurrentUser() {
  return useQuery({
    queryKey: ['auth', 'current-user'],
    queryFn: () => getCurrentUser(),
  });
}
