import { Student } from "@/app/types/student.type";
import { Card, CardContent } from "@/components/ui/card";

const formatDays = (time: Student["time"]) => {
  return time.map(({ day }) => day).join(", ");
};

const StudentCard = ({ student }: { student: Student }) => {
  const daysText = formatDays(student.time);

  return (
    <Card className="rounded-2xl shadow-md w-full max-w-md bg-blue-100 mx-20 my-10">
      <CardContent className="p-4">
        <h2 className="text-lg font-bold">
          <span className="underline underline-offset-2">{student.name}</span> (
          {student.schoolLevel} {student.grade})
        </h2>
        <p className="mt-1">{student.schoolName}</p>
        <p className="mt-1">
          주 {student.frequency}회 ({daysText}), 월{" "}
          {student.fee.toLocaleString()}원
        </p>
        <p className="mt-1">{student.address}</p>
      </CardContent>
    </Card>
  );
};

export default function StudentList({ students }: { students: Student[] }) {
  return (
    <div className="flex flex-col gap-4 items-start">
      {students.map((student, index) => (
        <StudentCard key={index} student={student} />
      ))}
    </div>
  );
}
