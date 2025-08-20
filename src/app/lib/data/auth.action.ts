"use server";
import { post } from "@/app/lib/data/fetcher";
import { User } from "@/app/types/user.type";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

export async function setCookies(role: string) {
  const cookie = await cookies();
  cookie.set("role", role, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
    sameSite: "lax",
  });
}

export async function register(data: FormData) {
  const role = data.get("role") as string;
  const email = data.get("email") ?? `${data.get("code") ?? ""}${role ?? ""}`;
  const password =
    data.get("password") ?? `${data.get("code") ?? ""}${role ?? ""}`;

  const response = await post<User>("/auth/register", {
    email,
    password,
    role,
  });

  // 학생, 학부모 정보 불러오기 위해 studentId 쿠키 세팅
  const user = response.data;
  if (user?.studentId) {
    const cookie = await cookies();
    cookie.set("studentId", user.studentId, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
      sameSite: "lax",
    });
  }

  if (role === "teacher")
    await redirect(`/teacher/auth/login`, RedirectType.replace);
  else await redirect(`/${role}/main`, RedirectType.replace);
}

export async function login(data: FormData) {
  const response = await post<User>("/auth/login", {
    email: data.get("email"),
    password: data.get("password"),
  });

  if (response.data != null) {
    const user = response.data;
    if (user?.id) {
      const cookie = await cookies();
      cookie.set("userId", user.id, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
        sameSite: "lax",
      });
    }
    await redirect(`/teacher/main`, RedirectType.replace);
  }
}
