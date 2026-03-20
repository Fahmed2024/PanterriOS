import { Button } from "@/components/ui/button";
import { DrawerClose } from "@/components/ui/drawer";
import { CircleX, Download, Lock, RefreshCw } from "lucide-react";
import { StatusBadge, TransactionAuditSkeleton } from "@/components/shared";
import { useRetrieveInvestorWalletDetails } from "@/hook/wallet-finance";

function formatCompactNaira(value: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
}

export function InvestorAudit({ investorId }: { investorId: number }) {
  const { data, isLoading, error } =
    useRetrieveInvestorWalletDetails(investorId);

  const walletDetails = data?.data;

  if (isLoading) return <TransactionAuditSkeleton />;
  if (error)
    return (
      <div className="p-4 text-sm text-red-500">
        Failed to load investor wallet details.
      </div>
    );

  return (
    <div className="mx-auto w-full max-w-2xl flex h-full flex-col">
      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
        {/* PROFILE CARD */}
        <div className="rounded-xl border bg-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-black text-lg font-semibold text-white">
                {walletDetails?.initials || "--"}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#0F172A]">
                  {walletDetails?.investorName}
                </h3>
                <p className="text-sm text-[#475569]">
                  {walletDetails?.investorCode}
                </p>
              </div>
            </div>

            <StatusBadge
              status={walletDetails?.statusLabel || "Active"}
              showDot
            />
          </div>
        </div>

        {/* OVERVIEW */}
        <section className="space-y-3">
          <h4 className="text-base font-semibold text-[#0F172A]">Overview</h4>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              {
                title: "Total Balance",
                value: walletDetails?.overview?.totalBalance,
              },
              {
                title: "Active Exposure",
                value: walletDetails?.overview?.activeExposure,
              },
              {
                title: "Accrued Yield",
                value: walletDetails?.overview?.accruedYield,
              },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-[#BFDBFE] bg-[#F8FAFC] p-5">
                <p className="text-sm min-h-10 text-[#475569]">{item.title}</p>
                <p className="mt-3 text-2xl font-semibold text-[#0F172A]">
                  {formatCompactNaira(item.value || 0)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* EXECUTIVE CONTROLS */}
        <section className="space-y-3">
          <h4 className="text-base font-semibold text-[#0F172A]">
            Executive Controls
          </h4>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Button
              variant="outline"
              className="h-16 rounded-lg text-sm flex items-center justify-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export Statement
            </Button>

            <Button
              variant="outline"
              className="h-16 rounded-lg text-sm flex items-center justify-center gap-2 border-[#FDBA74] text-[#C2410C]"
            >
              <Lock className="h-4 w-4" />
              Freeze Vault
            </Button>

            <Button
              variant="outline"
              className="h-16 rounded-lg text-sm flex items-center justify-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Sync Balance
            </Button>

            <Button
              variant="outline"
              className="h-16 rounded-lg text-sm flex items-center justify-center gap-2 border-[#FCA5A5] text-[#DC2626]"
            >
              <CircleX className="h-4 w-4" />
              Terminate Account
            </Button>
          </div>
        </section>

        {/* RECENT ACTIVITY */}
        <section className="space-y-3">
          <h4 className="text-base font-semibold text-[#0F172A]">
            Recent Activity
          </h4>

          <div className="space-y-2">
            {(walletDetails?.recentActivity || []).map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between rounded-lg border bg-[#F8FAFC] px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-[#0F172A]">
                    {event.title}
                  </p>
                  <p className="text-xs text-[#475569]">{event.occurredAt}</p>
                </div>

                <span>
                  <StatusBadge status={event.badge} showDot={false} />
                </span>
              </div>
            ))}

            {walletDetails?.recentActivity?.length === 0 && (
              <div className="rounded-lg border border-dashed px-4 py-5 text-center text-sm text-[#64748B]">
                No recent activity found.
              </div>
            )}
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <div className="border-t bg-white px-4 pt-4">
        <DrawerClose asChild>
          <Button className="h-11 w-full rounded-md text-sm bg-[#0B1533] text-white hover:bg-[#0B1533]/90">
            Close Control Center
          </Button>
        </DrawerClose>
      </div>
    </div>
  );
}
