"use client";

import { useMemo } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { PriceTrendSeriesPoint } from "@/interface/marketData.entity";

interface MarketPriceTrendChartProps {
  city: string;
  series: PriceTrendSeriesPoint[];
  loading?: boolean;
}

const SERIES_COLORS = [
  "#6C4DFF",
  "#155DFC",
  "#60A5FA",
  "#10B981",
  "#16A34A",
  "#14B8A6",
];

function formatMonthLabel(year: number, month: number) {
  const date = new Date(year, month - 1, 1);

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "2-digit",
  }).format(date);
}

export function MarketPriceTrendChart({
  city,
  series,
  loading,
}: MarketPriceTrendChartProps) {
  const { chartData, seriesKeys } = useMemo(() => {
    const byMonth = new Map<string, Record<string, number | string>>();
    const keys = new Set<string>();

    series.forEach((point) => {
      const monthLabel = formatMonthLabel(point.year, point.month);
      const seriesKey = point.label || point.propertyType || "Market";

      keys.add(seriesKey);

      const current = byMonth.get(monthLabel) ?? { month: monthLabel };
      current[seriesKey] = point.value;
      byMonth.set(monthLabel, current);
    });

    const data = Array.from(byMonth.values());

    return {
      chartData: data,
      seriesKeys: Array.from(keys),
    };
  }, [series]);

  const fallbackData = useMemo(
    () => [
      { month: "Aug 25", Residential: 100, Land: 85, Retail: 70, Infrastructure: 24 },
      { month: "Sep 25", Residential: 120, Land: 102, Retail: 78, Infrastructure: 32 },
      { month: "Oct 25", Residential: 121, Land: 108, Retail: 86, Infrastructure: 40 },
      { month: "Nov 25", Residential: 128, Land: 115, Retail: 100, Infrastructure: 45 },
      { month: "Dec 25", Residential: 138, Land: 124, Retail: 114, Infrastructure: 58 },
      { month: "Jan 26", Residential: 146, Land: 126, Retail: 126, Infrastructure: 72 },
    ],
    [],
  );

  const data = chartData.length ? chartData : fallbackData;
  const keys = seriesKeys.length ? seriesKeys : ["Residential", "Land", "Retail", "Infrastructure"];

  if (loading) {
    return (
      <div className="rounded-[28px] border border-[#E5E7EB] bg-white p-6 shadow-sm">
        <div className="h-6 w-56 animate-pulse rounded bg-slate-100" />
        <div className="mt-4 h-[520px] animate-pulse rounded-2xl bg-slate-50" />
      </div>
    );
  }

  return (
    <div className="rounded-[28px] border border-[#E5E7EB] bg-white p-6 shadow-sm">
      <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[#111827]">
            6-Month Price Trends - {city}
          </h2>
          <p className="text-sm text-[#64748B]">
            Property price movement by segment over the last six months.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 self-start rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-1 text-xs font-medium text-[#475569]">
          Live market series
        </div>
      </div>

      <div className="mt-6 h-[520px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 16, right: 8, left: 0, bottom: 8 }}>
            <CartesianGrid stroke="#E2E8F0" strokeDasharray="0" vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#334155", fontSize: 13, fontWeight: 600 }}
              dy={14}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#475569", fontSize: 12 }}
              width={42}
            />
            <Tooltip
              cursor={{ stroke: "#CBD5E1", strokeWidth: 1 }}
              contentStyle={{
                borderRadius: 16,
                border: "1px solid #E2E8F0",
                boxShadow: "0 20px 40px rgba(15, 23, 42, 0.12)",
              }}
            />
            <Legend
              verticalAlign="bottom"
              iconType="circle"
              wrapperStyle={{ paddingTop: 24 }}
            />
            {/* {keys.map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={SERIES_COLORS[index % SERIES_COLORS.length]}
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 3, fill: "#fff" }}
              />
            ))} */}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}