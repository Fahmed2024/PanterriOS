export interface MarketSeriesPoint {
  month: string;
  land: number;
  residential: number;
  retail: number;
  industrial: number;
  healthcare: number;
  studentHousing: number;
}

export interface MarketTableRow {
  subMarket: string;
  avgPrice: string;
  medianPrice: string;
  priceRange: string;
  momGrowth: string;
  yoyGrowth: string;
  volume: number;
}

export interface MarketStats {
  totalVolume: number;
  avgGrowth: string;
  medianPrice: string;
  propertyTypes: number;
}

export interface MarketCityData {
  city: string;
  areas: string[];
  updatedAt: string;
  stats: MarketStats;
  chartData: MarketSeriesPoint[];
  tableRows: MarketTableRow[];
}

export interface MarketSeriesConfigItem {
  key: keyof Omit<MarketSeriesPoint, 'month'>;
  label: string;
  color: string;
}

export interface MarketCityConfig {
  city: string;
  areas: string[];
  updatedAt: string;
  stats: MarketStats;
}