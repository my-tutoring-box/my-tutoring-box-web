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
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader>
        <CardTitle>
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
                <p className="text-sm font-medium leading-none">{d.date}</p>
                <p className="text-sm text-muted-foreground">{d.content}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        <p>한달 과외가 끝났습니다.</p>
        <p>
          {summary?.account.bank} {summary?.account.accountNumber}로 수업료{" "}
          {summary?.fee?.toLocaleString()}원 지급 부탁드립니다. 감사합니다.
        </p>
        <p>{summary?.data[summary.data.length - 1].date}</p>
      </CardFooter>
    </Card>
  );
}
