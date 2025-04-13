"use server";

import { Student } from "@/app/types/student.type";
import { get, post } from "./fetcher";
import { revalidatePath } from "next/cache";

export async function getStudents() {
  const response = await get("students");
  if (response.status === "success") {
    return response.data as Student[];
  } else {
    return [];
  }
}

export async function addStudent(formData: FormData) {
  const time = formData.getAll("time") as string[];

  const student = {
    name: formData.get("name")?.toString() || "",
    schoolLevel: formData.get("schoolLevel")?.toString() || "",
    grade: formData.get("grade")?.toString() || "",
    schoolName: formData.get("schoolName")?.toString() || "",
    address: formData.get("address")?.toString() || "",
    frequency: Number(formData.get("frequency")),
    fee: Number(formData.get("fee")),
    startDate: new Date(formData.get("startDate")?.toString() || ""),
    account: {
      bank: formData.get("bank")?.toString() || "",
      accountNumber: formData.get("accountNumber")?.toString() || "",
    },
    time: time.map((day) => ({
      day,
      range: { start: "00:00", end: "00:00" },
    })),
    code: "",
    count: 0,
  };

  await post("students", student);
  await revalidatePath("/teacher/main");
}
