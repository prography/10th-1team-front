import { cn } from "@/utils/cn";
import { ReactNode } from "react";

interface ScrollTabsListProps {
  children: ReactNode;
  className?: string;
  sticky?: boolean;
}

export default function ScrollTabsList({
  children,
  className = "",
  sticky = true,
}: ScrollTabsListProps) {
  return (
    <ul
      className={cn(
        "flex bg-white border-b-[0.5px] border-texticon-onnormal-lowestemp px-[16px]",
        sticky && "sticky top-0 z-10",
        className
      )}
    >
      {children}
    </ul>
  );
}
