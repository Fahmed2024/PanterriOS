import { articlesDashboardData } from "../../data";
import { ArticleRecord } from "../../data";

export function getCrawledQueueItems(category: string): ArticleRecord[] {
  const queueItems = articlesDashboardData.crawledQueue;

  if (category === "all") {
    return queueItems;
  }

  return queueItems.filter(
    (item) =>
      item.category.toLowerCase() === category ||
      item.tags.some((tag) => tag.toLowerCase() === category),
  );
}
