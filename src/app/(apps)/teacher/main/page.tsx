import { Suspense } from "react";
import MainPage from "./main";

export default function Page() {
  return (
    <Suspense>
      <MainPage />
    </Suspense>
  );
}
