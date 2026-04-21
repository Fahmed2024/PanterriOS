import { ColumnDef } from "@tanstack/react-table";
import { Eye, Trash2, Star } from "lucide-react";
import { EventRecordRow } from "../data";

function BadgePill({
  label,
  tone,
}: {
  label: string;
  tone: "type-virtual" | "type-physical" | "type-hybrid" | "source-submitted" | "source-ai";
}) {
  const toneClasses = {
    "type-virtual": "bg-[#DCFCE7] text-[#16A34A]",
    "type-physical": "bg-[#DBEAFE] text-[#2563EB]",
    "type-hybrid": "bg-[#EDE9FE] text-[#7C3AED]",
    "source-submitted": "bg-[#F5F3FF] text-[#7C3AED]",
    "source-ai": "bg-[#FFF7ED] text-[#EA580C]",
  };

  return (
    <span className={`inline-flex rounded-sm px-2 py-1 justify-center text-xs font-medium ${toneClasses[tone]}`}>
      {label}
    </span>
  );
}

export const eventRecordColumns: ColumnDef<EventRecordRow>[] = [
  {
    accessorKey: "name",
    header: "Event Name",
    cell: ({ row }) => (
      <div className="min-w-[260px]">
        <div className="flex items-start gap-2">
          <p className="text-base font-semibold text-[#111827]">{row.original.name}</p>
          {row.original.featured ? (
            <Star className="mt-0.5 h-3.5 w-3.5 fill-[#FACC15] text-[#FACC15]" />
          ) : null}
        </div>
        <p className="text-sm text-[#64748B]">{row.original.organizer}</p>
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <div>
        <p className="text-sm text-[#334155]">{row.original.date}</p>
        <p className="text-xs text-[#64748B]">{row.original.time}</p>
      </div>
    ),
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => <span className="text-sm text-[#334155]">{row.original.location}</span>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <span className="inline-flex rounded-sm bg-[#F1F5F9] px-2 py-0.5 text-xs text-[#334155]">
        {row.original.category}
      </span>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const tone =
        row.original.type === "Virtual"
          ? "type-virtual"
          : row.original.type === "Physical"
            ? "type-physical"
            : "type-hybrid";

      return <BadgePill label={row.original.type} tone={tone} />;
    },
  },
  {
    accessorKey: "source",
    header: "Source",
    cell: ({ row }) => {
      const tone = row.original.source === "Submitted" ? "source-submitted" : "source-ai";
      return <BadgePill label={row.original.source} tone={tone} />;
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <span className="text-sm font-semibold text-[#111827]">{row.original.price}</span>,
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: () => (
      <div className="inline-flex items-center gap-2 text-[#64748B]">
        <button type="button" className="transition hover:text-[#0F172A]" aria-label="View event">
          <Eye className="h-4 w-4" />
        </button>
        <button type="button" className="transition hover:text-[#DC2626]" aria-label="Delete event">
          <Trash2 className="h-4 w-4 text-[#DC2626]" />
        </button>
      </div>
    ),
  },
];
