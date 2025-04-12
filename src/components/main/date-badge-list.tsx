// components/DateBadgeList.tsx
import { Calendar } from "@/app/types/lesson.type";
import { format } from "date-fns";

interface DateBadgeListProps {
  allDates: Calendar[];
  nextClass: Calendar | null;
}

export default function DateBadgeList({
  allDates,
  nextClass,
}: DateBadgeListProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-6">
      {allDates.map((item) => {
        const formatted = format(item.date, "MM월 dd일");
        const isNext = nextClass && item.date === nextClass.date;

        return (
          <div
            key={item._id}
            className={`px-3 py-1 rounded-md text-sm font-semibold ${
              isNext ? "bg-red-500 text-white" : "bg-blue-100 text-blue-900"
            }`}
          >
            {formatted}
          </div>
        );
      })}
    </div>
  );
}
