"use client";

import { getCalenders } from "@/app/lib/data/lesson.action";
import { Calendar } from "@/app/types/lesson.type";
import DateBadgeList from "@/components/main/date-badge-list";
import { isAfter } from "date-fns";
import { useEffect, useState } from "react";

export default function Page() {
  const [nextClass, setNextClass] = useState<Calendar | null>(null);
  const [allDates, setAllDates] = useState<Calendar[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCalenders();
      console.log(data);
      if (!data) return;

      setAllDates(data);

      const now = new Date();
      const futureDates = data.filter((item) => isAfter(item.date, now));

      if (futureDates.length > 0) {
        setNextClass(futureDates[0]);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start p-6 md:p-10">
      <DateBadgeList allDates={allDates} nextClass={nextClass} />
    </div>
  );
}
