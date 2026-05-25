import {
  MarketDataParams,
  PriceTrendSeriesParams,
} from "@/interface/marketData.entity";
import {
  detailedMarketData,
  priceTrendSeries,
} from "@/services/marketData";
import { useQuery } from "@tanstack/react-query";

export const useDetailedMarketData = (params: MarketDataParams) => {
  const { data, error, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["detailedMarketData", params],
    queryFn: () => detailedMarketData(params),
  });

  return { data, error, isLoading, isFetching, refetch };
};

export const usePriceTrendSeries = (params: PriceTrendSeriesParams) => {
  const { data, error, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["priceTrendSeries", params],
    queryFn: () => priceTrendSeries(params),
  });

  return { data, error, isLoading, isFetching, refetch };
};
