import { Bot } from "lucide-react";
import { aiDiscoveredReviewItems } from "../data";
import { EventListCard } from "./EventListCard";

export function AIDiscoveredEventsTab() {
  return (
    <div className="rounded-xl border border-[#E5E7EB] bg-white">
      <div className="border-b border-[#E5E7EB] p-4">
        <h3 className="inline-flex items-center gap-2 text-lg font-semibold text-[#0F172A]">
          <Bot className="h-5 w-5 text-[#EA580C]" />
          AI-Discovered Events
        </h3>
        <p className="mt-1 text-sm text-[#64748B]">
          Events automatically discovered by AI crawlers
        </p>
      </div>

      <div className="space-y-3 p-4">
        {aiDiscoveredReviewItems.map((event) => (
          <EventListCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
