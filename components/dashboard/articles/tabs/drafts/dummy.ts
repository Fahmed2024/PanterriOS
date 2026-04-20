import { ArticleRecord, articlesDashboardData } from "../../data";

export function getDraftItems(category: string): ArticleRecord[] {
  const drafts = articlesDashboardData.drafts;

  if (category === "all") {
    return drafts;
  }

  return drafts.filter(
    (draft) =>
      draft.category.toLowerCase() === category ||
      draft.tags.some((tag) => tag.toLowerCase() === category),
  );
}
