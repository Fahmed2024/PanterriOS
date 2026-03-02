'use client';

import { useQuery } from '@tanstack/react-query';
import { getMyProfileDetails } from '@/services/user-management';

export function useMyProfileDetails() {
  return useQuery({
    queryKey: ['profile', 'me'],
    queryFn: getMyProfileDetails,
  });
}
