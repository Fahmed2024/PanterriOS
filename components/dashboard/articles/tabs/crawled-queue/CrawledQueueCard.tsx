import Image from "next/image";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  ExternalLink,
  User,
  XCircle,
} from "lucide-react";
import { ArticleRecord } from "../../data";

interface CrawledQueueCardProps {
  article: ArticleRecord;
}

export function CrawledQueueCard({ article }: CrawledQueueCardProps) {
  const publishedDate = article.publishedDate ?? "2026-02-18";
  const readTime = article.readTime ?? "6 min";

  return (
    <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="h-24 w-full shrink-0 overflow-hidden rounded-md bg-[#E2E8F0] sm:h-24 sm:w-36">
          {article.coverImage ? (
            <Image
              src={article.coverImage}
              alt={article.title}
              className="h-full w-full object-cover"
            />
          ) : null}
        </div>

        <div className="min-w-0 flex-1 space-y-2">
          <h3 className="truncate text-xl font-semibold text-[#0F172A]">
            {article.title}
          </h3>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#64748B]">
            <span className="inline-flex items-center gap-1">
              <ExternalLink className="h-4 w-4" />
              {article.source}
            </span>
            <span className="inline-flex items-center gap-1">
              <User className="h-4 w-4" />
              {article.author}
            </span>
            <span className="inline-flex items-center gap-1">
              <CalendarDays className="h-4 w-4" />
              {publishedDate}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock3 className="h-4 w-4" />
              {readTime}
            </span>
          </div>

          <p className="line-clamp-1 text-sm text-[#64748B]">
            {article.excerpt ?? "No summary available for this crawled article."}
          </p>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-md border border-[#BFDBFE] bg-[#EFF6FF] px-2 py-0.5 text-xs font-medium text-[#2563EB]">
              {article.category}
            </span>
            {article.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-[#F1F5F9] px-2 py-0.5 text-xs font-medium text-[#64748B]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              type="button"
              className="inline-flex items-center gap-2 cursor-pointer rounded-sm bg-[#0AA84F] px-3 py-1.5 text-sm font-medium text-white transition hover:bg-[#098a42]"
            >
              <CheckCircle2 className="h-4 w-4" />
              Approve & Publish
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-2 cursor-pointer rounded-sm border border-[#FCA5A5] bg-white px-3 py-1.5 text-sm font-medium text-[#DC2626] transition hover:bg-[#FEF2F2]"
            >
              <XCircle className="h-4 w-4" />
              Reject
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-2 px-2 py-1.5 text-sm font-medium text-[#111827] transition hover:text-[#1D4ED8]"
            >
              <ExternalLink className="h-4 w-4" />
              View Source
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
