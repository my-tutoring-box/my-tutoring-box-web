"use server";

import { cookies } from "next/headers";
import { get } from "./fetcher";
import { Summary } from "@/app/types/lesson.type";

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
