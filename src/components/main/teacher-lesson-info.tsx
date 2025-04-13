"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Lesson } from "@/app/types/lesson.type";
import { setLesson } from "@/app/lib/data/lesson.action";

type Props = {
  lesson: Lesson;
};

export default function TeacherLessonInfo({ lesson }: Props) {
  const [content, setContent] = useState(lesson.content || "");
  const [homeworkList, setHomeworkList] = useState(
    lesson.homework.length > 0 ? lesson.homework : [{ text: "", complete: 0 }]
  );

  const handleHomeworkChange = (index: number, value: string) => {
    const updated = [...homeworkList];
    updated[index].text = value;
    setHomeworkList(updated);
  };

  const addHomework = () => {
    setHomeworkList([...homeworkList, { text: "", complete: 0 }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const body = {
      content,
      homework: homeworkList,
    };

    await setLesson(lesson._id, body);
    window.location.reload();
  };

  const isInitialEmpty =
    content.trim() === "" && homeworkList.every((h) => h.text.trim() === "");

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4 mt-4">
        <h2 className="text-lg font-bold">수업 내용</h2>
        <Input
          id="content"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="flex justify-between items-center mt-4">
          <h2 className="text-lg font-bold">숙제</h2>
          <Button type="button" variant="outline" onClick={addHomework}>
            + 추가
          </Button>
        </div>

        {homeworkList.map((hw, index) => (
          <div key={index} className="flex items-center gap-2">
            <Checkbox
              checked={hw.complete === 1}
              disabled
              className="border-blue-400 bg-blue-200"
            />
            <Input
              name={`homework-${index}`}
              value={hw.text}
              onChange={(e) => handleHomeworkChange(index, e.target.value)}
              className="w-full"
            />
          </div>
        ))}

        <div className="flex justify-end mt-6">
          <Button type="submit" className="px-6">
            {isInitialEmpty ? "입력" : "수정"}
          </Button>
        </div>
      </div>
    </form>
  );
}
