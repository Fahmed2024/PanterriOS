"use client";

import {
  Activity,
  Layers3,
  Shield,
  User2,
} from "lucide-react";
import { PageHead, ReUseAbleTable, StatCard } from "@/components/shared";
import { auditLogColumns } from "./auditLogColumns";
import { useRetrieveAuditLogs } from "@/hook/audit-log";

export function AuditLogsContainer() {
  const { data } = useRetrieveAuditLogs({
    page: 1,
    limit: 10,
  });

  const rows = data?.data?.data ?? [];
  const stats = data?.data?.stats;

  return (
    <div className="w-full space-y-6 px-0">
      <PageHead
        pageTitle="Audit Logs"
        subTitle="Monitor and review all administrative activities across the platform."
      />

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 xl:grid-cols-4">
        <StatCard
          label="Total Activity"
          value={(stats?.totalActivity ?? 0).toLocaleString()}
          description="Last 24h"
          Icon={Activity}
          iconColor="text-[#155DFC]"
          bgColor="bg-[#DBEAFE]"
        />
        <StatCard
          label="Critical Events"
          value={stats?.criticalEvents ?? 0}
          description="Last 24h"
          Icon={Shield}
          iconColor="text-[#C2410C]"
          bgColor="bg-[#FFEDD5]"
        />
        <StatCard
          label="Admin Logins"
          value={stats?.adminLogins ?? 0}
          description="Last 24h"
          Icon={User2}
          iconColor="text-[#1D4ED8]"
          bgColor="bg-[#DBEAFE]"
        />
        {/* <StatCard
          label="Active Regions"
          value={0}
          description="Lagos and Abuja"
          Icon={Layers3}
          iconColor="text-[#1D4ED8]"
          bgColor="bg-[#DBEAFE]"
        /> */}
        <StatCard
          label="Modules Count"
          value={stats?.modulesCount ?? 0}
          description="Distinct modules"
          Icon={Layers3}
          iconColor="text-[#1D4ED8]"
          bgColor="bg-[#DBEAFE]"
        />
      </div>

      <ReUseAbleTable
        columns={auditLogColumns}
        data={rows}
        entityName="records"
      />
    </div>
  );
}
