"use client";

import { useQuery } from "@tanstack/react-query";
import { retrieveInvestorWalletDetails } from "@/services/wallet-finance";

export function useRetrieveInvestorWalletDetails(
  investorId?: number,
  enabled = true,
) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["wallet-finance", "investor-wallets", "details", investorId],
    queryFn: () => retrieveInvestorWalletDetails(investorId as number),
    enabled:
      enabled &&
      typeof investorId === "number" &&
      Number.isFinite(investorId),
  });

  return { data, isLoading, isError, error, refetch };
}
