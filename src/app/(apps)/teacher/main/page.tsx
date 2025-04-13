"use client";

import { getStudents } from "@/app/lib/data/student.action";
import { Student } from "@/app/types/student.type";
import StudentList from "@/components/main/student-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

export default function Page() {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const students = await getStudents();
      setStudents(students);
    };

    fetchData();
  }, []);

  return (
    <div className="px-6 py-8">
      <div className="flex justify-end mb-4">
        <Button>
          <Plus />
        </Button>
      </div>
      <StudentList students={students} />
    </div>
  );
}
