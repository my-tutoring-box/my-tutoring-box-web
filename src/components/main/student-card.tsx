import { Card, CardContent } from "@/components/ui/card";
import { Student } from "@/app/types/student.type";

const formatDays = (time: Student["time"]) => {
  return time.map(({ day }) => day).join(", ");
};

export default function StudentCard({
  student,
  onClick,
}: {
  student: Student;
  onClick: () => void;
}) {
  const daysText = formatDays(student.time);

  return (
    <Card
      onClick={onClick}
      className="cursor-pointer bg-blue-100 w-[400px] rounded-2xl shadow-md hover:shadow-lg transition"
    >
      <CardContent className="p-6">
        <h2 className="text-lg font-bold">
          <span className="underline underline-offset-2">{student.name}</span> (
          {student.schoolLevel} {student.grade})
        </h2>
        <p className="mt-2">{student.schoolName}</p>
        <p className="mt-1">
          주 {student.frequency}회 ({daysText}), 월{" "}
          {student.fee.toLocaleString()}원
        </p>
        <p className="mt-1">{student.address}</p>
      </CardContent>
    </Card>
  );
}
