import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useUserStore } from "@/app/stores/user-store";
import { register } from "@/app/lib/data/auth.action";

export function InputCodeForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { role } = useUserStore();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            선생님에게 받은 코드를 입력해 <strong>마과박</strong>을 이용하세요!
          </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <form action={register}>
            <input type="hidden" name="role" value={role ?? ""} />
            <div className="flex flex-row gap-2">
              <InputOTP
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                id="code"
                type="code"
                name="code"
                required
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <Button type="submit" className={`bg-${role}`}>
                확인
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
