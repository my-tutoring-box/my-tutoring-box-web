"use client";

import { addStudent } from "@/app/lib/data/student.action";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function StudentForm() {
  return (
    <form
      action={addStudent}
      className="space-y-6 max-w-md mx-auto p-6 border rounded-xl shadow-md bg-white"
    >
      <h2 className="text-2xl font-bold text-center">과외생을 추가해주세요!</h2>

      <div className="space-y-1">
        <Label htmlFor="name">이름</Label>
        <Input id="name" name="name" placeholder="이름" required />
      </div>

      <div className="flex gap-2">
        <div className="flex-1 space-y-1">
          <Label htmlFor="schoolLevel">학교급</Label>
          <Input
            id="schoolLevel"
            name="schoolLevel"
            placeholder="ex: 중학교"
            required
          />
        </div>
        <div className="flex-1 space-y-1">
          <Label htmlFor="grade">학년</Label>
          <Input id="grade" name="grade" placeholder="ex: 1학년" required />
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="schoolName">학교명</Label>
        <Input id="schoolName" name="schoolName" placeholder="학교명" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="address">주소</Label>
        <Input id="address" name="address" placeholder="주소" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="frequency">주당 수업 횟수</Label>
        <Input
          id="frequency"
          name="frequency"
          type="number"
          placeholder="주당 수업 횟수"
          required
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="fee">과외비</Label>
        <Input
          id="fee"
          name="fee"
          type="number"
          placeholder="숫자만 입력"
          required
        />
      </div>

      <div className="flex gap-2">
        <div className="flex-1 space-y-1">
          <Label htmlFor="bank">은행</Label>
          <Input id="bank" name="bank" placeholder="은행" />
        </div>
        <div className="flex-1 space-y-1">
          <Label htmlFor="accountNumber">계좌 번호</Label>
          <Input
            id="accountNumber"
            name="accountNumber"
            placeholder="계좌 번호"
          />
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="startDate">시작일</Label>
        <Input id="startDate" name="startDate" type="date" required />
      </div>

      <div>
        <p className="font-semibold mt-4 mb-2">요일 선택</p>
        <div className="flex flex-wrap gap-4">
          {["월", "화", "수", "목", "금", "토", "일"].map((day) => (
            <div key={day} className="flex items-center gap-2">
              <Checkbox id={`day-${day}`} name="time" value={day} />
              <Label htmlFor={`day-${day}`}>{day}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit" className="px-6">
          확인
        </Button>
      </div>
    </form>
  );
}
