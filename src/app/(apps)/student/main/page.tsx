"use client";

import { getCalenders, getLesson } from "@/app/lib/data/lesson.action";
import { Calendar, Lesson } from "@/app/types/lesson.type";
import DateBadgeList from "@/components/main/date-badge-list";
import LessonInfo from "@/components/main/lesson-info";
import { isAfter } from "date-fns";
import { useEffect, useState } from "react";

export default function Page() {
  const [nextClass, setNextClass] = useState<Calendar | null>(null);
  const [allDates, setAllDates] = useState<Calendar[]>([]);
  const [lesson, setLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // set calendars
      const data = await getCalenders();
      if (!data) return;

      setAllDates(data);

      const now = new Date();
      const futureDates = data.filter((item) => isAfter(item.date, now));

      if (futureDates.length > 0) {
        setNextClass(futureDates[0]);
      }

      // set lessons
      const lesson = await getLesson();
      setLesson(lesson);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start p-6 md:p-10">
      <DateBadgeList allDates={allDates} nextClass={nextClass} />
      {lesson && (
        <div className="w-full max-w-lg mt-8">
          <LessonInfo lesson={lesson} />
        </div>
      )}
    </div>
  );
}
