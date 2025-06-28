import { ReactNode } from "react";
import { useScrollTabs } from "./ScrollTabsContainer";

interface ScrollTabPanelProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export default function ScrollTabPanel({
  value,
  children,
  className = "",
}: ScrollTabPanelProps) {
  const { sectionRefs } = useScrollTabs();

  return (
    <div
      ref={(el) => {
        if (el) sectionRefs.current[value] = el;
      }}
      className={className}
    >
      {children}
    </div>
  );
}
