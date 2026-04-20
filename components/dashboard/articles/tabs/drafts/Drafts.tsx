import { useMemo } from "react";
import { ReUseAbleTable } from "@/components/shared";
import { draftColumns } from "./draftColumns";
import { getDraftItems } from "./dummy";

interface ArticlesTabProps {
  category: string;
}

export function Drafts({ category }: ArticlesTabProps) {
  const filteredDrafts = useMemo(() => getDraftItems(category), [category]);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-semibold text-[#0F172A]">Draft Queue</h3>
      </div>
      {filteredDrafts.length > 0 ? (
        <ReUseAbleTable
          data={filteredDrafts}
          columns={draftColumns}
          entityName="drafts"
        />
      ) : (
        <div className="rounded-xl border border-dashed border-[#D1D5DB] p-8 text-center text-sm text-gray-500">
          No drafts found for this category.
        </div>
      )}
    </div>
  );
}
