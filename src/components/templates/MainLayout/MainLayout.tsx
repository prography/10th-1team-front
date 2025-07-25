import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <main className="mx-auto w-full max-w-[600px] min-h-[100dvh] flex flex-col items-center bg-surface-normal-bg02">
      {children}
    </main>
  );
}
