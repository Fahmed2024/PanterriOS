'use client';

import Link from 'next/link';
import { CircleCheck, CircleX, Clock3, RotateCcw } from 'lucide-react';
import { type ColumnDef } from '@tanstack/react-table';
import { type ApprovalQueueItem } from '@/interface';

function StatusChip({ status }: { status: string }) {
  const normalized = status.toLowerCase();

  if (normalized === 'completed' || normalized === 'approved') {
    return (
      <span className="inline-flex items-center gap-2 rounded-md border border-[#BBF7D0] bg-[#F0FFF4] px-3 py-1 text-sm text-[#16A34A]">
        <CircleCheck className="h-4 w-4" />
        Completed
      </span>
    );
  }

  if (normalized === 'returned') {
    return (
      <span className="inline-flex items-center gap-2 rounded-md border border-[#BFDBFE] bg-[#EFF6FF] px-3 py-1 text-sm text-[#2563EB]">
        <RotateCcw className="h-4 w-4" />
        Returned
      </span>
    );
  }

  if (normalized === 'rejected') {
    return (
      <span className="inline-flex items-center gap-2 rounded-md border border-[#FECACA] bg-[#FEF2F2] px-3 py-1 text-sm text-[#DC2626]">
        <CircleX className="h-4 w-4" />
        Rejected
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-2 rounded-md border border-[#FDE68A] bg-[#FFFBEB] px-3 py-1 text-sm text-[#B45309]">
      <Clock3 className="h-4 w-4" />
      Pending
    </span>
  );
}

export const approvalQueueColumns = (
  activeTab: 'submitted' | 'assigned',
): ColumnDef<ApprovalQueueItem>[] => {
  const submittedByColumn: ColumnDef<ApprovalQueueItem>[] =
    activeTab === 'assigned'
      ? [
          {
            id: 'submittedBy',
            header: 'Submitted By',
            cell: ({ row }) => (
              <span className="text-base text-[#526581]">
                {row.original.submittedBy?.name ?? '-'}
              </span>
            ),
          },
        ]
      : [];

  return [
    {
      accessorKey: 'reference',
      header: 'ID',
      cell: ({ row }) => (
        <span className="text-base font-semibold text-[#0F172A]">
          {row.original.reference}
        </span>
      ),
    },
    {
      accessorKey: 'workflowName',
      header: 'Workflow Name',
      cell: ({ row }) => (
        <Link
          href={`/approval-queue/${row.original.id}`}
          className="text-base text-[#111827] hover:text-[#2563EB]"
        >
          {row.original.workflowName}
        </Link>
      ),
    },
    {
      accessorKey: 'module',
      header: 'Module',
      cell: ({ row }) => (
        <span className="text-base text-[#111827]">{row.original.module}</span>
      ),
    },
    {
      accessorKey: 'action',
      header: 'Action',
      cell: ({ row }) => (
        <span className="text-base text-[#111827]">{row.original.action}</span>
      ),
    },
    ...submittedByColumn,
    {
      accessorKey: 'requestStatus',
      header: 'Status',
      cell: ({ row }) => <StatusChip status={row.original.requestStatus} />,
    },
    {
      accessorKey: 'createdAt',
      header: 'Date Submitted',
      cell: ({ row }) => (
        <span className="text-base whitespace-nowrap text-[#526581]">
          {row.original.createdAt}
        </span>
      ),
    },
  ];
};
