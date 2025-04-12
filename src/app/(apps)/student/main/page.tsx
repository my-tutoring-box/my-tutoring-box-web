"use client";

import { getCalenders, getLesson } from "@/app/lib/data/lesson.action";
import { Calendar, Lesson } from "@/app/types/lesson.type";
import DateBadgeList from "@/components/main/date-badge-list";
import StudentLessonInfo from "@/components/main/student-lesson-info";
import { format, isAfter } from "date-fns";
import { ko } from "date-fns/locale";
import { useEffect, useState } from "react";

export default function Page() {
  const [nextClass, setNextClass] = useState<Calendar | null>(null);
  const [nextClassSession, setNextClassSession] = useState<number | null>(null);
  const [allDates, setAllDates] = useState<Calendar[]>([]);
  const [lesson, setLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // set calendars
      const data = await getCalenders();
      if (!data) return;

      setAllDates(data);

      const now = new Date();
      const futureIndex = data.findIndex((item) => isAfter(item.date, now));

      if (futureIndex !== -1) {
        setNextClass(data[futureIndex]);
        setNextClassSession(futureIndex + 1);
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
      <div className="flex fle-row gap-5 text-center text-2xl font-bold mt-4">
        <p className="mb-2">
          &lt;{nextClassSession}/{allDates.length} 일 째!&gt;
        </p>
        <p>
          {nextClass?.date
            ? format(new Date(nextClass.date), "M월 d일 EEE", { locale: ko })
            : null}
        </p>
      </div>
      {lesson && (
        <div className="w-full max-w-lg mt-8">
          <StudentLessonInfo lesson={lesson} />
        </div>
      )}
    </div>
  );
}
