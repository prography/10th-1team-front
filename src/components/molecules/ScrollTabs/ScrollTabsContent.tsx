import { ReactNode } from "react";
import { useScrollTabs } from "./ScrollTabsContainer";

interface ScrollTabsContentProps {
  children: ReactNode;
  className?: string;
}

export default function ScrollTabsContent({
  children,
  className = "",
}: ScrollTabsContentProps) {
  const { containerRef } = useScrollTabs();

  return (
    <div ref={containerRef} className={`flex-1 overflow-y-auto ${className}`}>
      {children}
    </div>
  );
}
