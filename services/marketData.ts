import { 
    MarketDataResponse,
  MarketDataParams,
  PriceTrendSeriesParams,
  PriceTrendSeriesResponse,

  } from "@/interface/marketData.entity";
import { ANALYTICS_API } from "./axios";


export const detailedMarketData = async (
  params: MarketDataParams,
): Promise<MarketDataResponse> => {
  const { data } = await ANALYTICS_API.get("/analytics/detailed-market-data", {
    params,
  });
  return data;
};

export const priceTrendSeries = async (
  params: PriceTrendSeriesParams,
): Promise<PriceTrendSeriesResponse> => {
  const { city, months = 6, location, propertyType } = params;
  const { data } = await ANALYTICS_API.get(`/market-data/chart/${city}`, {
    params: {
      months,
      location,
      propertyType,
    },
  });

  return data;
};