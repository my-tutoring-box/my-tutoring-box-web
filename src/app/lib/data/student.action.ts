"use server";

import { Student } from "@/app/types/student.type";
import { get, post } from "./fetcher";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function setStudentId(studentId: string) {
  const cookie = await cookies();
  cookie.set("studentId", studentId, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
    sameSite: "lax",
  });
}

export async function getStudents() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value ?? "";
  const response = await get(`students/${userId}/students`);

  if (response.status === "success") {
    return response.data as Student[];
  } else {
    return [];
  }
}

export async function addStudent(formData: FormData) {
  const time = formData.getAll("time") as string[];
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value ?? "";

  const student = {
    userId: userId,
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
  revalidatePath("/teacher/main");
  redirect("/teacher/main?refresh=1");
}
