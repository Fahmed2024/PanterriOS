import { type ColumnDef } from "@tanstack/react-table";
import { PencilLine } from "lucide-react";
import type { MarketData } from "@/interface/marketData.entity";

const moneyFormatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

function toNumber(value: unknown) {
  if (typeof value === "number") return value;
  if (typeof value !== "string") return 0;

  const parsed = Number(value.replace(/[^\d.-]/g, ""));

  return Number.isFinite(parsed) ? parsed : 0;
}

function formatValue(value: unknown) {
  const amount = toNumber(value);

  if (!amount) return "—";

  return moneyFormatter.format(amount);
}

function formatPercent(value: unknown) {
  const amount = toNumber(value);

  if (!amount) return "0.0%";

  const percent = Math.abs(amount) <= 1 ? amount * 100 : amount;

  return `${percent.toFixed(1)}%`;
}

export const marketDataColumns: ColumnDef<MarketData>[] = [
  {
    accessorKey: "subMarket",
    header: "sub-market",
    cell: ({ row }) => (
      <div className="font-medium text-[#111827]">{row.original.subMarket}</div>
    ),
  },
  {
    accessorKey: "sampleAssetType",
    header: "sample asset",
    cell: ({ row }) => (
      <div className="font-medium capitalize text-[#0F172A]">
        {row.original.sampleAssetType}
      </div>
    ),
  },
  {
    accessorKey: "averageSalePrice",
    header: "avg sale price",
    cell: ({ row }) => (
      <div className="font-semibold text-[#0F172A]">
        {formatValue(row.original.averageSalePrice)}
      </div>
    ),
  },
  {
    accessorKey: "medianRent",
    header: "median rent",
    cell: ({ row }) => (
      <div className="font-semibold text-[#0F172A]">
        {formatValue(row.original.medianRent)}
      </div>
    ),
  },
  {
    accessorKey: "rentMin",
    header: "rent range",
    cell: ({ row }) => (
      <div className="font-medium text-[#334155]">
        {formatValue(row.original.rentMin)} - {formatValue(row.original.rentMax)}
      </div>
    ),
  },
  {
    accessorKey: "growthVal",
    header: "mom growth",
    cell: ({ row }) => (
      <div className="font-medium text-emerald-600">
        {formatPercent(row.original.growthVal)}
      </div>
    ),
  },
  {
    accessorKey: "averageYearOverYearGrowth",
    header: "yoy growth",
    cell: ({ row }) => (
      <div className="font-medium text-blue-600">
        {formatPercent(row.original.averageYearOverYearGrowth)}
      </div>
    ),
  },
  {
    accessorKey: "yield",
    header: "yield",
    cell: ({ row }) => (
      <div className="inline-flex rounded-md bg-slate-100 px-2 py-1 text-sm font-medium text-slate-700">
        {formatPercent(row.original.yield)}
      </div>
    ),
  },
  {
    id: "actions",
    header: "actions",
    cell: () => (
      <button
        type="button"
        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#E5E7EB] text-[#111827] transition-colors hover:bg-[#F8FAFC]"
        aria-label="Edit market row"
      >
        <PencilLine className="h-4 w-4" />
      </button>
    ),
  },
];