import { ColumnDef } from "@tanstack/react-table";
import { PencilLine, Trash2 } from "lucide-react";
import { ArticleRecord } from "../../data";

function CategoryPill({ label }: { label: string }) {
  return (
    <span className="inline-flex rounded-sm border border-[#BFDBFE] bg-[#EFF6FF] px-3 py-1 text-xs font-medium text-[#2563EB]">
      {label}
    </span>
  );
}

export const draftColumns: ColumnDef<ArticleRecord>[] = [
  {
    accessorKey: "title",
    header: "Article",
    cell: ({ row }) => (
      <div className="min-w-[400px]">
        <p className="text-lg font-semibold text-[#0F172A]">
          {row.original.title}
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {row.original.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-xs bg-[#EEF2F6] px-3 py-1 text-xs font-medium text-[#45556C]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "author",
    header: "Author",
    cell: ({ row }) => (
      <span className="text-sm text-[#111111] sm:text-base">{row.original.author}</span>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <CategoryPill label={row.original.category} />,
  },
  {
    accessorKey: "publishedDate",
    header: "Created",
    cell: ({ row }) => (
      <span className="text-sm text-[#45556C] sm:text-base">
        {row.original.publishedDate ?? row.original.publishedAt}
      </span>
    ),
  },
  {
    accessorKey: "readTime",
    header: "Read Time",
    cell: ({ row }) => (
      <span className="text-sm text-[#45556C] sm:text-base">{row.original.readTime ?? "7 min"}</span>
    ),
  },
  {
    accessorKey: "action",
    header: "",
    cell: () => (
      <div className="flex items-center justify-end gap-4">
        <button
          type="button"
          className="cursor-pointer rounded-sm p-1 text-[#111827] transition hover:bg-[#F1F5F9] hover:text-[#0B1533]"
          aria-label="Edit draft"
        >
          <PencilLine className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="cursor-pointer rounded-sm p-1 text-[#EF4444] transition hover:bg-[#FEF2F2] hover:text-[#DC2626]"
          aria-label="Delete draft"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    ),
  },
];
