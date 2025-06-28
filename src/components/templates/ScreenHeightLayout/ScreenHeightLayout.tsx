import { ReactNode } from "react";

interface ScreenHeightLayoutProps {
  children: ReactNode;
}

export default function ScreenHeightLayout({
  children,
}: ScreenHeightLayoutProps) {
  return (
    <main className="mx-auto w-full max-w-[600px] h-screen flex flex-col items-center bg-surface-normal-bg02">
      {children}
    </main>
  );
}
