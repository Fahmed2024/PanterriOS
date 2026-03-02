'use client';

import { useQuery } from '@tanstack/react-query';
import { retrieveAdminUserProfile } from '@/services/user-management';

export function useRetrieveAdminUserProfile(userId: number) {
  return useQuery({
    queryKey: ['users', 'details', userId],
    queryFn: () => retrieveAdminUserProfile(userId),
    enabled: Number.isFinite(userId) && userId > 0,
  });
}
