"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ReUseAbleTable } from "@/components/shared";
import {
  useDisburseInvestmentYield,
  useFlagYieldDisbursement,
  useRetrieveYieldDisbursementLedger,
} from "@/hook/wallet-finance";
import { getDisburseColumns } from "./disburseColums";
import { debounce, formatCurrency } from "@/utils/helpers";
import { toast } from "sonner";
import { CheckCircle2, Search, Upload } from "lucide-react";

interface YieldDisburseDetailsProps {
  eventId: string;
  investmentId: number;
  onSuccess?: () => void;
}

interface FlagDisbursementPayload {
  eventId: string;
  investmentFundId: number;
  investorName: string;
}

export function YieldDisburseDetails({
  eventId,
  investmentId,
  onSuccess,
}: YieldDisburseDetailsProps) {
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");

  const debouncedSetSearch = useMemo(
    () => debounce((value: string) => setDebouncedSearchValue(value), 600),
    [],
  );

  const { data, isLoading } = useRetrieveYieldDisbursementLedger(eventId, {
    page,
    limit: 20,
    search: debouncedSearchValue || undefined,
  });

  const { mutateAsync: disburseYield, isPending: isDisbursing } =
    useDisburseInvestmentYield();

  const { mutateAsync: flagDisbursement, isPending: isFlagging } =
    useFlagYieldDisbursement();

  const detail = data?.data;

  const handleDisburse = async () => {
    try {
      await disburseYield(investmentId);
      toast.success("Yield disbursement started successfully");
      onSuccess?.();
    } catch {
      //   toast.error("Unable to disburse yield right now");
    }
  };

  const handleFlagDisbursement = async ({
    eventId,
    investmentFundId,
    investorName,
  }: FlagDisbursementPayload) => {
    try {
      await flagDisbursement({ eventId, investmentFundId });
      toast.success(`Disbursement for ${investorName} flagged`);
    } catch {}
  };

  const columns = getDisburseColumns({
    eventId,
    isFlagging,
    onFlagDisbursement: handleFlagDisbursement,
  });

  const statusLabel =
    detail?.status === "pending"
      ? "Waiting to Disburse"
      : detail?.status === "disbursed"
        ? "Disbursed"
        : detail?.status || "";

  return (
    <div className="space-y-6 px-4">
      {/* Header */}
      <div className="flex flex-col gap-6 border-b pb-6 lg:flex-row lg:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase text-slate-500">
            Property Name
          </p>
          <h2 className="text-2xl font-semibold text-slate-800">
            {detail?.investmentName || "-"}
          </h2>

          <div className="mt-3 flex gap-6">
            <div>
              <p className="text-[11px] font-semibold uppercase text-slate-500">
                Returns Date
              </p>
              <p className="text-sm font-semibold text-slate-800">
                {detail?.returnsDate || "-"}
              </p>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase text-slate-500">
                Yield Rate
              </p>
              <p className="text-sm font-semibold text-slate-800">
                {detail?.yieldRate ?? 0}%
              </p>
            </div>
          </div>
        </div>

        <div className="text-left lg:text-right">
          <p className="text-[11px] font-semibold uppercase text-slate-500">
            Total Payout
          </p>
          <p className="text-3xl font-semibold text-slate-800">
            {formatCurrency(detail?.totalPayout ?? 0)}
          </p>

          <div className="mt-2 inline-flex items-center gap-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            {statusLabel}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase text-slate-600">
          Investor Distribution
        </p>

        <div className="flex flex-col gap-3 xl:flex-row xl:justify-between">
          <div className="relative w-full xl:max-w-[420px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                setPage(1);
                debouncedSetSearch(e.target.value);
              }}
              placeholder="Search..."
              className="h-10 bg-white border border-slate-200 pl-9"
            />
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleDisburse}
              disabled={isDisbursing || isLoading}
              className="bg-[#00A63E] hover:bg-[#00A63E]/90 text-white"
            >
              <CheckCircle2 className="mr-2 h-4 w-4" />
              {isDisbursing ? "Disbursing..." : "Disburse Funds"}
            </Button>

            <Button variant="outline" className="border-slate-300">
              <Upload className="mr-2 h-4 w-4" />
              Export csv
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-lg border border-slate-200 overflow-hidden">
          <ReUseAbleTable
            columns={columns}
            data={detail?.investors ?? []}
            entityName="participating investors"
            pagination={
              data?.pagination
                ? {
                    currentPage: data.pagination.currentPage,
                    totalPages: data.pagination.totalPages,
                    totalItems: data.pagination.totalItems,
                    limit: data.pagination.limit,
                    onPageChange: setPage,
                  }
                : undefined
            }
          />
        </div>
      </div>
    </div>
  );
}
