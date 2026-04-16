import { useMemo } from "react";
import { CrawledQueueCard } from ".";
import { getCrawledQueueItems } from "./dummy";

interface ArticlesTabProps {
  category: string;
}

export function CrawledQueue({ category }: ArticlesTabProps) {
  const filteredItems = useMemo(() => getCrawledQueueItems(category), [category]);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-semibold text-[#0F172A]">Crawled Articles Queue</h3>
        <p className="text-sm text-[#64748B]">
          Review and approve AI-discovered content from external sources
        </p>
      </div>

      {filteredItems.length > 0 ? (
        filteredItems.map((item) => <CrawledQueueCard key={item.id} article={item} />)
      ) : (
        <div className="rounded-xl border border-dashed border-[#D1D5DB] p-8 text-center text-sm text-gray-500">
          No crawled articles found for this category.
        </div>
      )}
    </div>
  );
}
