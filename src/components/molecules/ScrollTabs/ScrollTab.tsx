import { cn } from "@/utils/cn";
import { ReactNode, useEffect } from "react";
import { useScrollTabs } from "./ScrollTabsContainer";

interface ScrollTabProps {
  value: string;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
}

export default function ScrollTab({
  value,
  children,
  className = "",
}: ScrollTabProps) {
  const { activeTab, scrollToSection, tabOrder } = useScrollTabs();
  const isActive = activeTab === value;

  useEffect(() => {
    if (!tabOrder.current.includes(value)) {
      tabOrder.current.push(value);
    }
  }, [value, tabOrder]);

  const handleClick = () => {
    scrollToSection(value);
  };

  return (
    <li
      className={cn(
        "py-[14px] cursor-pointer border-b-[2px] border-transparent transition-colors text-center",
        isActive
          ? "body-s-semibold text-texticon-onnormal-highestemp border-texticon-onnormal-highestemp"
          : "body-s-regular text-texticon-onnormal-lowemp",
        className
      )}
      onClick={handleClick}
    >
      {children}
    </li>
  );
}
