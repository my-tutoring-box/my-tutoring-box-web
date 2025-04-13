"use client";

import { useEffect, useState } from "react";
import { getStudents } from "@/app/lib/data/student.action";
import { Student } from "@/app/types/student.type";
import { useRouter, useSearchParams } from "next/navigation";
import StudentList from "@/components/main/student-list";
import StudentForm from "@/components/main/student-form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function MainPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  const showForm = searchParams.get("add") === "1";

  useEffect(() => {
    const fetch = async () => {
      const data = await getStudents();
      setStudents(data);
    };
    fetch();
  }, []);

  return (
    <div className="px-6 py-8">
      <div className="flex justify-end mb-4">
        <Button onClick={() => router.push("?add=1")}>
          <Plus />
        </Button>
      </div>

      {showForm ? (
        <StudentForm />
      ) : (
        <StudentList
          students={students}
          onCardClick={(student) => router.push(`/teacher/main/${student._id}`)}
        />
      )}
    </div>
  );
}
