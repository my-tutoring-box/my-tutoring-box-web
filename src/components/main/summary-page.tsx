"use client";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSummary } from "@/app/lib/data/lesson.action";
import { useEffect, useState } from "react";
import { Summary } from "@/app/types/lesson.type";

type CardProps = React.ComponentProps<typeof Card>;

export function SummaryPage({ className, ...props }: CardProps) {
  const [summary, setSummary] = useState<Summary | null>(null);

  useEffect(() => {
    (async () => {
      const res = await getSummary();
      setSummary(res);
    })();
  }, []);

  return (
    <Card className={cn("w-[500px]", className)} {...props}>
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          {summary?.name} 제 {summary?.cycle}회 가정통신문
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          {summary?.data.map((d, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-l font-medium leading-none">
                  <strong>{index + 1}회차</strong> - {d.date}
                </p>
                <p className="text-m text-muted-foreground">{d.content}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="text-left">
          <p className="mt-2 mb-1">한달 과외가 끝났습니다.</p>
          <p className="mb-1">
            <strong>
              {summary?.account.bank} {summary?.account.accountNumber}
            </strong>
            로 수업료 <strong>{summary?.fee?.toLocaleString()}원</strong> 지급
            부탁드립니다.
          </p>
          <p> 감사합니다.</p>
        </div>
        <strong className="text-lg mt-4">
          {summary?.data[summary.data.length - 1].date}
        </strong>
      </CardFooter>
    </Card>
  );
}
