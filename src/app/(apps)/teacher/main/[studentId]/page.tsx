"use client";

import { getCalendars, getLesson } from "@/app/lib/data/lesson.action";
import { Calendar, Lesson } from "@/app/types/lesson.type";
import DateBadgeList from "@/components/main/date-badge-list";
import TeacherLessonInfo from "@/components/main/teacher-lesson-info";
import { format, isAfter } from "date-fns";
import { ko } from "date-fns/locale";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { studentId } = useParams();

  const [nextClass, setNextClass] = useState<Calendar | null>(null);
  const [nextClassSession, setNextClassSession] = useState<number | null>(null);
  const [allDates, setAllDates] = useState<Calendar[]>([]);
  const [lesson, setLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!studentId || typeof studentId !== "string") return null;

      const data = await getCalendars(studentId);
      if (!data) return;

      setAllDates(data);

      const now = new Date();
      const futureIndex = data.findIndex((item) => isAfter(item.date, now));

      if (futureIndex !== -1) {
        setNextClass(data[futureIndex]);
        setNextClassSession(futureIndex + 1);
      }

      const lesson = await getLesson(studentId);
      setLesson(lesson);
    };

    fetchData();
  }, [studentId]);

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
          <TeacherLessonInfo lesson={lesson} />
        </div>
      )}
    </div>
  );
}
