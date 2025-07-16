import { Suspense } from "react";

export default function OAuthCallbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<></> /* TODO: 로딩 화면 추가 필요 */}>
      {children}
    </Suspense>
  );
}
