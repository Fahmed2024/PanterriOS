import { ColumnDef } from "@tanstack/react-table";
import { type ReactElement } from "react";
import {
  SlideInPanelDrawer,
  StatusBadge,
  TransactionAuditSkeleton,
} from "@/components/shared";
import { YieldDisbursementItem } from "@/interface";
import { formatCurrency } from "@/utils/helpers";
import { Button } from "@/components/ui/button";

export const yieldColumns: ColumnDef<YieldDisbursementItem>[] = [
  {
    accessorKey: "eventId",
    header: "Event ID",
    cell: ({ row }) => {
      const ref = row.original.eventId;
      const displayRef = ref.length > 25 ? ref.substring(0, 25) + "..." : ref;
      return (
        <span
          className="font-medium text-base text-gray-900 cursor-pointer"
          title={ref}
        >
          {displayRef}
        </span>
      );
    },
  },
  {
    accessorKey: "investmentName",
    header: "Property Name",
    cell: ({ row }) => (
      <span className="text-gray-700">{row.original.investmentName}</span>
    ),
  },
  {
    accessorKey: "totalInvestors",
    header: "Investors",
    cell: ({ row }) => (
      <span className="text-gray-700">{row.original.totalInvestors}</span>
    ),
  },
  {
    accessorKey: "yieldRate",
    header: "Yield Rate",
    cell: ({ row }) => (
      <span
        className={
          "inline-flex items-center gap-2 rounded-sm border px-3 py-1 text-xs font-medium border-[#BEDBFF] bg-[#EFF6FF]  text-[#1447E6]"
        }
      >
        {row.original.yieldRate}%
      </span>
    ),
  },

  {
    accessorKey: "totalPayout",
    header: "Total Payout",
    cell: ({ row }) => (
      <span className="font-semibold text-[#00A63E]">
        {formatCurrency(row.original.totalPayout)}
      </span>
    ),
  },
  {
    accessorKey: "dateTime",
    header: "Date & Time",
    cell: ({ row }) => (
      <span className="text-gray-600">
        {row.original.disbursedDate} {"  "} {row.original.disbursedTime}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.statusBreakdown;
      const flagged = status.flagged;
      const pending = status.pending;
      const disbursed = status.disbursed;

      if (flagged === 0 && pending === 0 && disbursed > 0) {
        return (
          <span className="inline-flex items-center gap-2 rounded-sm border border-green-300 bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
            All Disbursed
          </span>
        );
      }

      const badges: ReactElement[] = [];

      if (disbursed > 0) {
        badges.push(
          <span
            key="disbursed"
            className="inline-flex items-center gap-2 rounded-sm border border-green-300 bg-green-50 px-3 py-1 text-xs font-medium text-green-700"
          >
            {disbursed} Disbursed
          </span>,
        );
      }

      if (flagged > 0) {
        badges.push(
          <span
            key="flagged"
            className="inline-flex items-center gap-2 rounded-sm border border-red-300 bg-red-50 px-3 py-1 text-xs font-medium text-red-700"
          >
            {flagged} Flagged
          </span>,
        );
      }

      if (pending > 0) {
        badges.push(
          <span
            key="pending"
            className="inline-flex items-center gap-2 rounded-sm border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700"
          >
            {pending} Pending
          </span>,
        );
      }

      return (
        <div className="flex flex-wrap items-center gap-2">
          {badges.length > 0 ? (
            badges
          ) : (
            <StatusBadge status={row.original.status} showDot />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const transaction = row.original;

      return (
        <SlideInPanelDrawer
          trigger={
            <Button
              variant={"outline"}
              className="border px-2 py-1 shadow-sm  cursor-pointer rounded-md"
            >
              View Details
            </Button>
          }
          title="Transaction Audit"
          subtitle={transaction.eventId}
          width="md"
        >
          <TransactionAuditSkeleton />
        </SlideInPanelDrawer>
      );
    },
  },
];
