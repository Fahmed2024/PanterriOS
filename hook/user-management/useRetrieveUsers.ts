'use client';

import { useQuery } from '@tanstack/react-query';
import { retrieveUsers } from '@/services/user-management';

export function useRetrieveUsers({
  search = '',
  page = 1,
  limit = 10,
}: {
  search?: string;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ['users', 'list', search, page, limit],
    queryFn: () => retrieveUsers({ search, page, limit }),
  });
}
