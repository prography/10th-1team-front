import { cn } from "@/utils/cn";
import { ReactNode } from "react";
import IconButton from "../IconButton/IconButton";

export interface DefaultHeaderProps {
  title: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  onClickStartIcon?: () => void;
  onClickEndIcon?: () => void;
  className?: string;
  fullWidth?: boolean;
}

export default function DefaultHeader({
  title,
  startIcon,
  endIcon,
  onClickStartIcon,
  onClickEndIcon,
  className,
  fullWidth = false,
}: DefaultHeaderProps) {
  return (
    <header
      className={cn(
        "relative flex items-center justify-between h-[64px] bg-surface-normal-container0 px-[16px]",
        fullWidth && "w-full",
        className
      )}
    >
      <div className="flex items-center min-w-[2.5rem] justify-start">
        <IconButton onClick={onClickStartIcon} startIcon={startIcon} />
      </div>
      <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 body-m-semibold text-texticon-onnormal-highestemp whitespace-nowrap">
        {title}
      </h1>
      <div className="flex items-center min-w-[2.5rem] justify-end">
        <IconButton onClick={onClickEndIcon} endIcon={endIcon} />
      </div>
    </header>
  );
}
