'use client';

import { useQuery } from '@tanstack/react-query';
import { retriveEvents } from '@/services/events';
import { EventFilters } from '@/interface';

export function useRetrieveEvents(query: EventFilters) {
  return useQuery({
    queryKey: ['Events', query],
    queryFn: () => retriveEvents(query),
  });
}
