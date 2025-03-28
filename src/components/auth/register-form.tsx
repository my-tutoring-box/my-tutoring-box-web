import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/app/stores/user-store";
import { register } from "@/app/lib/data/auth.action";

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { role } = useUserStore();
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">회원 가입</CardTitle>
          <CardDescription>
            계정을 생성하여 &quot;과외 통합 관리 서비스&quot;{" "}
            <strong>마과박</strong>을 이용하세요!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={register}>
            <input type="hidden" name="role" value={role ?? ""} />
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">비밀번호</Label>
                </div>
                <Input id="password" type="password" name="password" required />
              </div>
              <Button type="submit" className="w-full bg-teacher">
                회원 가입
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
