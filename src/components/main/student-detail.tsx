"use client";

import { getCalendars } from "@/app/lib/data/lesson.action";
import { Calendar } from "@/app/types/lesson.type";
import DateBadgeList from "@/components/main/date-badge-list";
import { isAfter } from "date-fns";
import { useEffect, useState } from "react";

type Props = {
  studentId: string;
  onBack: () => void;
};

export default function StudentDetail({ studentId, onBack }: Props) {
  const [nextClass, setNextClass] = useState<Calendar | null>(null);
  const [allDates, setAllDates] = useState<Calendar[]>([]);

  useEffect(() => {
    history.pushState({ isStudentDetail: true }, "");

    const handlePopState = () => {
      onBack();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [onBack]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCalendars(studentId);
      if (!data) return;

      setAllDates(data);

      const now = new Date();
      const futureDates = data.filter((item) => isAfter(item.date, now));
      if (futureDates.length > 0) {
        setNextClass(futureDates[0]);
      }
    };

    fetchData();
  }, [studentId]);

  return (
    <div className="flex flex-col items-center justify-start p-6 md:p-10">
      <DateBadgeList allDates={allDates} nextClass={nextClass} />
    </div>
  );
}
