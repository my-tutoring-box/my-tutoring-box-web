"use server";

import { cookies } from "next/headers";
import { get } from "./fetcher";
import { Calendar, Lesson, Summary } from "@/app/types/lesson.type";

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

export async function getCalenders() {
  const cookieStore = await cookies();
  const studentId = cookieStore.get("studentId")?.value ?? "";
  const response = await get(`students/${studentId}/calendars`);

  if (response.status === "success") {
    return response.data as Calendar[];
  } else {
    return null;
  }
}

export async function getLesson() {
  const cookieStore = await cookies();
  const studentId = cookieStore.get("studentId")?.value ?? "";
  const response = await get(`${studentId}/lessons`);

  if (response.status === "success") {
    return response.data as Lesson;
  } else {
    return null;
  }
}
