import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Lesson } from "@/app/types/lesson.type";

type Props = {
  lesson: Lesson;
};

export default function LessonInfo({ lesson }: Props) {
  const hasHomework = lesson.homework && lesson.homework.length > 0;

  return (
    <div className="space-y-2 mt-4">
      <h2 className="text-lg font-bold mb-2">수업 내용</h2>
      <Input value={lesson.content} readOnly />
      <h2 className="text-lg font-bold">숙제</h2>
      {hasHomework ? (
        lesson.homework.map((hw) => (
          <div key={hw._id} className="flex items-center gap-2">
            <Checkbox
              checked={hw.complete === 1}
              disabled
              className="border-blue-400 bg-blue-200"
            />
            <Input value={hw.text} readOnly className="w-full" />
          </div>
        ))
      ) : (
        <p>없음</p>
      )}
    </div>
  );
}
