'use client';

import { useQuery } from '@tanstack/react-query';
import { retrieveDraftInvestments } from '@/services/investment-management';

export function useRetrieveDraftInvestments({
  search = '',
  page = 1,
  limit = 10,
  state,
  investmentStatus,
  propertyType,
}: {
  search?: string;
  page?: number;
  limit?: number;
  state?: string;
  investmentStatus?: string;
  propertyType?: string;
}) {
  return useQuery({
    queryKey: [
      'investments',
      'drafts',
      {
        search,
        page,
        limit,
        state,
        investmentStatus,
        propertyType,
      },
    ],
    queryFn: () =>
      retrieveDraftInvestments({
        search,
        page,
        limit,
        state,
        investmentStatus,
        propertyType,
      }),
  });
}