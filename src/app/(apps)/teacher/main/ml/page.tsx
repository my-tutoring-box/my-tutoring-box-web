"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { predict } from "@/app/lib/data/ml.action";
import { PredictionResult } from "@/app/types/ml.type";

export default function MathMockPage() {
  const [answers, setAnswers] = useState<string[]>(Array(30).fill(""));
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [open, setOpen] = useState(false);

  const handleChange = (index: number, value: string) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const handleSubmit = async () => {
    const numericAnswers = answers.map((a) => parseInt(a));
    if (numericAnswers.some((v) => isNaN(v) || v < 0 || v > 1)) {
      alert("모든 값은 0 또는 1이어야 합니다. (오답: 0, 정답: 1)");
      return;
    }

    const res = await predict({ answers: numericAnswers });
    if (res) {
      setResult(res);
      setOpen(true);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center mt-5 mb-10">
        수학 모의고사 채점 결과 입력
      </h1>

      <div className="grid grid-cols-5 gap-4">
        {answers.map((answer, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <label className="text-sm text-gray-500">Q{idx + 1}</label>
            <Input
              type="number"
              min={0}
              max={1}
              value={answer}
              onChange={(e) => handleChange(idx, e.target.value)}
              className="w-16 text-center"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSubmit}>제출</Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>📊 예측 결과</DialogTitle>
          </DialogHeader>
          {result && (
            <div className="space-y-4">
              <p className="text-lg font-semibold text-center">{result.type}</p>
              <div>
                <h3 className="font-medium mb-1">추천 문제집:</h3>
                <ul className="list-disc list-inside text-sm">
                  {result.workbooks.map((title, i) => (
                    <li key={i}>{title}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
