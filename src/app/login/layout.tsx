import MainLayout from "@/components/templates/MainLayout/MainLayout";
import { Suspense } from "react";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainLayout>
      <Suspense fallback={<></> /* TODO: 로딩 화면 추가 필요 */}>
        {children}
      </Suspense>
    </MainLayout>
  );
}
