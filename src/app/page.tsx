"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useUserStore } from "./stores/user-store";
import { setCookies } from "./lib/data/auth.action";

export default function Home() {
  const router = useRouter();
  const { setRole } = useUserStore();

  return (
    <div className="container mx-auto py-60 px-5 sm:px-6 md:px-8 lg:px-10">
      <h2 className="text-center text-2xl sm:text-3xl md:text-5xl scroll-m-20 mt-12 pb-2 font-semibold tracking-tight first:mt-0">
        마과박에 온 걸 환영합니다!
      </h2>
      <p className="text-center text-base sm:text-xl md:text-2xl mb-8">
        가입 유형을 선택해주세요.
      </p>

      <div className="flex flex-col items-center gap-5">
        <Button
          className="p-3 sm:p-4 lg:p-5 text-base sm:text-lg lg:text-xl bg-teacher"
          onClick={() => {
            setRole("teacher");
            setCookies("teacher");
            router.push("/teacher/auth/login");
          }}
        >
          선생님
        </Button>
        <Button
          className="p-3 sm:p-4 lg:p-5 text-base sm:text-lg lg:text-xl bg-student"
          onClick={() => {
            setRole("student");
            setCookies("student");
            router.push("/student/auth/login");
          }}
        >
          학생
        </Button>
        <Button
          className="p-3 sm:p-4 lg:p-5 text-base sm:text-lg lg:text-xl bg-parents"
          onClick={() => {
            setRole("parents");
            setCookies("parents");
            router.push("/parents/auth/login");
          }}
        >
          학부모
        </Button>
      </div>
    </div>
  );
}
