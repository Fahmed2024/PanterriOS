import { Clock3, MapPin, Users, Pencil, Trash2 } from "lucide-react";
import { EventRecord } from "../../data";
import { Button } from "@/components/ui/button";

interface EventListCardProps {
  event: EventRecord;
}

const statusClassMap: Record<string, string> = {
  "AI Discovered": "border border-[#FED7AA] bg-[#FFF7ED] text-[#EA580C]",
  Submitted: "border border-[#DDD6FE] bg-[#F5F3FF] text-[#7C3AED]",
};

export function EventListCard({ event }: EventListCardProps) {
  const isFree = event.price.toLowerCase() === "free";

  return (
    <div className="rounded-xl border border-[#E5E7EB] bg-white p-4 sm:p-5">
      <div className="flex items-start gap-4">
        <div className="flex w-15  shrink-0 flex-col items-center rounded-lg bg-gradient-to-b from-[#1d292d] to-[#45556c] px-3 py-2.5 text-white shadow-sm">
          <span className="text-xl font-bold leading-none">
            {event.dateLabel}
          </span>
          <span className="mt-1 text-xs font-medium tracking-wide text-[#CBD5E1]">
            {event.monthLabel}
          </span>
        </div>

        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-sm border border-[#E5E7EB] bg-[#F9FAFB] px-2 py-0.5 text-xs text-[#111827]">
                {event.type}
              </span>
              <span className="rounded-sm border border-[#E5E7EB] bg-[#F9FAFB] px-2 py-0.5 text-xs text-[#111827]">
                {event.category}
              </span>
              {event.badges.map((badge) => (
                <span
                  key={badge}
                  className={`rounded-sm px-2 py-0.5 text-xs ${statusClassMap[badge] ?? "bg-[#EEF2FF] text-[#3730A3]"}`}
                >
                  {badge}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3 text-[#6B7280]">
              <button className="hover:text-[#111827]">
                <Pencil className="h-5 w-5 cursor-pointer text-[#111111]" />
              </button>
              <button className="hover:text-[#DC2626] cursor-pointer">
                <Trash2 className="h-5 w-5 text-[#E7000B]" />
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-2xl leading-[1.25] font-semibold text-[#0F172B]">
              {event.title}
            </h4>
            <p className="mt-1 text-base md:w-[90%] leading-6 text-[#4B5563]">
              {event.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 border-y border-[#E5E7EB] py-3 md:grid-cols-4">
            <div>
              <p className="mb-1 inline-flex items-center gap-1 text-sm text-[#4B5563]">
                <Clock3 className="h-4 w-4" /> Time
              </p>
              <p className="text-sm text-[#111827]">{event.time}</p>
            </div>
            <div>
              <p className="mb-1 inline-flex items-center gap-1 text-sm text-[#4B5563]">
                <MapPin className="h-4 w-4" /> Location
              </p>
              <p className="text-sm text-[#111827]">{event.location}</p>
            </div>
            <div>
              <p className="mb-1 inline-flex items-center gap-1 text-sm text-[#4B5563]">
                <Users className="h-4 w-4" /> Attendees
              </p>
              <p className="text-sm text-[#0F172B]">{event.attendees}</p>
            </div>
            <div>
              <p className="mb-1 text-sm text-[#4B5563]">Price</p>
              <p
                className={`text-sm font-semibold text-[#00A63E]`}
              >
                {event.price}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {event.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-sm bg-[#EEF2F7] px-2 py-1 text-xs text-[#334155]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
