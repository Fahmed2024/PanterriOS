import Image from "next/image";
import { CalendarDays, Clock, ExternalLink } from "lucide-react";
import { ArticleRecord } from "../data";

interface ArticlePreviewProps {
  article: ArticleRecord;
}

export function ArticlePreview({ article }: ArticlePreviewProps) {
  const excerpt = article.excerpt ?? "No article summary available.";
  const publishedDate = article.publishedDate ?? article.publishedAt;
  const readTime = article.readTime ?? "5 min";
  const publisher = article.publisher ?? "Vanguard Business";

  return (
    <div className="mx-auto w-full pb-10 max-w-3xl space-y-5">
      <div className="rounded-xl border border-[#D4D4D8] bg-white p-4 sm:p-5">
        <div className="overflow-hidden rounded-lg">
          {article.coverImage ? (
            <Image
              src={article.coverImage}
              alt={article.title}
              className="h-[220px] w-full object-cover sm:h-[360px]"
              priority
            />
          ) : (
            <div className="h-[220px] w-full bg-[#E2E8F0] sm:h-[360px]" />
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="rounded-sm bg-black px-3 py-1.5 text-sm font-normal text-white">
            {article.category}
          </span>
          <span className="inline-flex items-center gap-1 text-sm text-[#64748B]">
            <Clock className="h-4 w-4" />
            {readTime}
          </span>
          {article.badges.map((badge) => (
            <span
              key={badge}
              className="rounded-sm border border-[#F5D478] bg-[#FFF8E1] px-3 py-1 text-sm font-medium text-[#B45309]"
            >
              {badge}
            </span>
          ))}
        </div>

        <h3 className="mt-4 text-xl font-semibold leading-[1.3] text-[#0F172A] sm:text-3xl">
          {article.title.replace("...", "")}
        </h3>

        <p className="mt-4 text-sm italic leading-7 text-[#475569] sm:text-lg sm:leading-9">
          {excerpt}
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-sm text-[#111827] sm:text-lg">
          <span className="font-normal text-base">Aishat Mohammed</span>
          <span className="text-base font-normal">{publisher}</span>
          <span className="inline-flex font-normal text-base items-center gap-2">
            <CalendarDays className="h-5 w-5" />
            {publishedDate}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-[#EEF2F6] px-3 py-1 text-xs font-medium text-[#475569] sm:text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="inline-flex px-4 mt-3 items-center gap-2 text-sm font-medium text-[#111827] transition hover:text-[#1D4ED8] sm:text-base"
      >
        <ExternalLink className="h-5 w-5" />
        View Full article
      </button>
    </div>
  );
}
