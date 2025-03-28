import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="container mx-auto py-50 px-5 sm:px-6 md:px-8 lg:px-10">
      <h2 className="text-center text-5xl scroll-m-20 mt-50 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        마과박에 온 걸 환영합니다!
      </h2>
      <p className="text-3xl text-center mb-15">가입 유형을 선택해주세요.</p>
      <div className="flex flex-col items-center gap-5">
        <Button className="text-xl p-5 bg-teacher">선생님</Button>
        <Button className="text-xl p-5 bg-student">학생</Button>
        <Button className="text-xl p-5 bg-parents">학부모</Button>
      </div>
    </div>
  );
}
