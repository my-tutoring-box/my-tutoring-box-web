import { Student } from "@/app/types/student.type";
import StudentCard from "./student-card";

export default function StudentList({
  students,
  onCardClick,
}: {
  students: Student[];
  onCardClick: (student: Student) => void;
}) {
  return (
    <div className="flex flex-wrap gap-6 mx-20 my-10">
      {students.map((student) => (
        <StudentCard
          key={student._id}
          student={student}
          onClick={() => onCardClick(student)}
        />
      ))}
    </div>
  );
}
