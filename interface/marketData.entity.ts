export interface MarketDataParams {
  page?: number;
  per_page?: number;
  selection?: string;
  all?: boolean | string;
  city?: string;
  area?: string;
}

export interface MarketDataResponse {
  meta: {
    status_code: number;
    success: boolean;
    pagination: {
      total_count: number;
      per_page: number;
      current: number;
      current_page: string;
    };
  };
  data: MarketData[];
}

export interface MarketData {
  _id: string;
  subMarket: string;
  sampleAssetType: string;
  area: string;
  city: string;
  __v: number;
  growthVal: string | number;
  averageRent: number | string;
  averageRentPrice: number | string;
  averageSalePrice: string | number;
  averageYearOverYearGrowth: string | number;
  createdAt: string;
  medianRent: string;
  rentMax: string;
  rentMin: string;
  source: string;
  updatedAt: string;
  vacancyRate: string;
  yield: string;
}

// ------------------- Price Trend Series

export interface PriceTrendSeriesParams {
  city: string;
  months?: number;
  location?: string;
  propertyType?: string;
}

export interface PriceTrendSeriesPoint {
  propertyType: string;
  location: string;
  unit: string;
  label: string;
  year: number;
  month: number;
  value: number;
}

export interface PriceTrendSeriesResponse {
  meta: {
    status_code: number;
    success: boolean;
  };
  data: {
    city: string;
    months: number;
    series: PriceTrendSeriesPoint[];
  };
}
