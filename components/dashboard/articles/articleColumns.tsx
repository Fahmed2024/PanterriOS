import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Eye, Trash2 } from "lucide-react";
import { ArticleRecord } from "./data";
import { SlideInPanelDrawer } from "@/components/shared/SlideInPanel";
import { ArticlePreview } from "./tabs/ArticlePreview";

function BadgePill({ label, tone = "default" }: { label: string; tone?: "default" | "blue" | "purple" | "amber" }) {
  const toneClasses = {
    default: "border-[#FDE68A] bg-[#FFFBEB] text-[#D97706]",
    blue: "border-[#BFDBFE] bg-[#EFF6FF] text-[#2563EB]",
    purple: "border-[#E9D5FF] bg-[#F3E8FF] text-[#8B5CF6]",
    amber: "border-[#FDE68A] bg-[#FFFBEB] text-[#D97706]",
  };

  return (
    <span className={`inline-flex rounded-md border px-3 py-1 text-sm font-medium ${toneClasses[tone]}`}>
      {label}
    </span>
  );
}

export const publishedArticleColumns: ColumnDef<ArticleRecord>[] = [
  {
    accessorKey: "title",
    header: "Article",
    cell: ({ row }) => (
      <div className="flex items-start gap-3">
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-[#E2E8F0]">
          {row.original.coverImage ? (
            <Image
              src={row.original.coverImage}
              alt={row.original.title}
              className="h-full w-full object-cover"
            />
          ) : null}
        </div>
        <div className="min-w-0">
          <p className="max-w-[360px] truncate text-base font-semibold text-[#0F172B]">
            {row.original.title}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {row.original.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-sm bg-[#F1F5F9] px-3 py-1 text-sm font-medium text-[#45556C]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "author",
    header: "Author",
    cell: ({ row }) => (
      <span className="text-base text-[#111111]">{row.original.author}</span>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <BadgePill label={row.original.category} tone="blue" />
    ),
  },
  {
    accessorKey: "source",
    header: "Source",
    cell: ({ row }) => {
      const tone = row.original.source === "Crawled" ? "amber" : "purple";
      return <BadgePill label={row.original.source} tone={tone} />;
    },
  },
  {
    accessorKey: "publishedAt",
    header: "Published",
    cell: ({ row }) => (
      <span className="text-base text-[#45556C]">{row.original.publishedAt}</span>
    ),
  },
  {
    accessorKey: "views",
    header: "Views",
    cell: ({ row }) => (
      <span className="text-base font-medium text-[#111111]">
        {row.original.views.toLocaleString()}
      </span>
    ),
  },
  {
    accessorKey: "badges",
    header: "Badges",
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-2">
        {row.original.badges.length > 0 ? (
          row.original.badges.map((badge) => (
            <BadgePill key={badge} label={badge} />
          ))
        ) : (
          <span className="text-sm text-transparent">-</span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-3 text-gray-500">
        <SlideInPanelDrawer
          trigger={
            <button
              type="button"
              className="transition hover:text-gray-900"
              aria-label="View article"
            >
              <Eye className="h-5 w-5" />
            </button>
          }
          title="Article Preview"
          subtitle="View article details"
          width="lg"
          contentClassName="mx-0"
        >
          <ArticlePreview article={row.original} />
        </SlideInPanelDrawer>
        <button type="button" className="transition hover:text-red-600" aria-label="Delete article">
          <Trash2 className="h-5 w-5 text-red-600" />
        </button>
      </div>
    ),
  },
];
