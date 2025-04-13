"use server";

import { Student } from "@/app/types/student.type";
import { get } from "./fetcher";

export async function getStudents() {
  const response = await get("students");
  if (response.status === "success") {
    return response.data as Student[];
  } else {
    return [];
  }
}
