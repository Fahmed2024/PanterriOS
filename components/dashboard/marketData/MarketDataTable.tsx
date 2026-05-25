"use client";

import { useMemo, useState } from 'react';
import { TableFilters } from '@/components/shared';
import { ReUseAbleTable } from '@/components/shared/reusableTable';
import type { MarketData } from '@/interface/marketData.entity';
import { marketDataColumns } from './marketDataColumns';

interface MarketDataTableProps {
  city: string;
  rows: MarketData[];
}

export function MarketDataTable({ city, rows }: MarketDataTableProps) {
  const [searchValue, setSearchValue] = useState('');

  const filteredRows = useMemo(() => {
    const query = searchValue.trim().toLowerCase();

    if (!query) {
      return rows;
    }

    return rows.filter((row) =>
      [
        row.subMarket,
        row.sampleAssetType,
        row.averageSalePrice,
        row.averageRent,
        row.vacancyRate,
        row.growthVal,
        row.averageYearOverYearGrowth,
        row.yield,
        row.area,
        row.city,
        row.updatedAt,
      ]
        .join(' ')
        .toLowerCase()
        .includes(query),
    );
  }, [rows, searchValue]);

  return (
    <div className="rounded-[28px] border border-[#E5E7EB] bg-white p-4 shadow-sm sm:p-6">
      <TableFilters
        title={`Detailed Market Data - ${city}`}
        subtitle={`Showing ${filteredRows.length} of ${rows.length} market segments`}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        searchPlaceholder="Search by sub-market, asset, price, or growth..."
      />

      <div className="mt-5">
        <ReUseAbleTable
          data={filteredRows}
          columns={marketDataColumns}
          entityName="market segments"
        />
      </div>
    </div>
  );
}