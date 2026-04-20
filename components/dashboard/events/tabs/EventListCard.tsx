import {
  Calendar,
  CheckCircle2,
  CircleX,
  Eye,
  MapPin,
  Clock3,
} from "lucide-react";
import { EventReviewRecord } from "../data";

interface ReviewEventCardProps {
  event: EventReviewRecord;
}

const sourceClassMap: Record<string, string> = {
  EventBrite: "border-[#FED7AA] bg-[#FFF7ED] text-[#EA580C]",
  Submitted: "border-[#DDD6FE] bg-[#F5F3FF] text-[#7C3AED]",
  AI: "border-[#FED7AA] bg-[#FFF7ED] text-[#EA580C]",
};

export function EventListCard({ event }: ReviewEventCardProps) {
  return (
    <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-6">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h4 className="text-base font-semibold text-[#111827]">
          {event.title}
        </h4>
        <span
          className={`rounded-sm border px-2 py-0.5 text-xs ${sourceClassMap[event.source] ?? "border-[#E5E7EB] text-[#334155]"}`}
        >
          {event.source}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 text-sm text-[#334155] md:grid-cols-2">
        <div className="space-y-2">
          <p className="inline-flex items-center gap-1">
            <MapPin className="h-4 w-4 text-[#64748B]" /> {event.location}
          </p>
          <p className="inline-flex items-center pl-4 gap-1">
            <Clock3 className="h-4 w-4 text-[#64748B]" /> {event.time}
          </p>
          <p>
            {event.organizerLabel}:
            <span className="text-[#475569]">{" "}{event.organizerValue}</span>
          </p>
        </div>
        <div className="space-y-2">
          <p className="inline-flex items-center gap-2">
            <Calendar className="h-4 w-4 text-[#64748B]" /> {event.date}
          </p>
          <p>
            Price: <span className="text-[#475569]">{event.price}</span>
          </p>
          {event?.email && (
            <p>
              Email: <span className="text-[#475569]">{event.email}</span>
            </p>
          )}
          <p>
            Category: <span className="text-[#475569]">{event.category}</span>
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-md border border-[#D1D5DB] bg-white px-4 text-sm font-medium text-[#111827]"
          >
            <Eye className="h-4 w-4" />
            Preview
          </button>
          <button
            type="button"
            className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-md bg-[#16A34A] px-4 text-sm font-medium text-white"
          >
            <CheckCircle2 className="h-4 w-4" />
            Approve & Publish
          </button>
          <button
            type="button"
            className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-md border border-[#FCA5A5] bg-white px-4 text-sm font-medium text-[#DC2626]"
          >
            <CircleX className="h-4 w-4" />
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
