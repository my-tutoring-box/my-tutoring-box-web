"use server";

import { cookies } from "next/headers";
import { get, patch } from "./fetcher";
import { Calendar, Lesson, LessonBody, Summary } from "@/app/types/lesson.type";

export async function getSummary() {
  const cookieStore = await cookies();
  const studentId = cookieStore.get("studentId")?.value ?? "";
  const response = await get(`${studentId}/lessons/summary`);

  if (response.status === "success") {
    return response.data as Summary;
  } else {
    return null;
  }
}

export async function getCalendars(studentId?: string) {
  const cookieStore = await cookies();
  studentId = studentId ? studentId : cookieStore.get("studentId")?.value ?? "";
  const response = await get(`students/${studentId}/calendars`);

  if (response.status === "success") {
    return response.data as Calendar[];
  } else {
    return null;
  }
}

export async function getLesson(studentId?: string) {
  const cookieStore = await cookies();
  studentId = studentId ? studentId : cookieStore.get("studentId")?.value ?? "";
  const response = await get(`${studentId}/lessons`);

  if (response.status === "success") {
    return response.data as Lesson;
  } else {
    return null;
  }
}

export async function setHomeworkComplete(
  lessonId: string,
  homeworkId: string
) {
  const cookieStore = await cookies();
  const studentId = cookieStore.get("studentId")?.value ?? "";
  const response = await patch(
    `${studentId}/lessons/${lessonId}/homeworks/${homeworkId}`,
    {}
  );

  if (response.status === "success") {
    return response.data as Lesson;
  } else {
    return null;
  }
}

export async function setLesson(lessonId: string, body: LessonBody) {
  const cookieStore = await cookies();
  const studentId = cookieStore.get("studentId")?.value ?? "";
  const response = await patch(`${studentId}/lessons/${lessonId}`, body);

  if (response.status === "success") {
    return response.data as Lesson;
  } else {
    return null;
  }
}
