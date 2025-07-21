import { cn } from "@/utils/cn";
import { ReactNode } from "react";

export interface MenuItemProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  icon?: ReactNode;
  selected?: boolean;
}

export default function MenuItem({
  onClick,
  label,
  icon,
  selected,
}: MenuItemProps) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick(e);
      }}
      className={cn(
        "flex w-full px-[24px] py-[12px] items-center justify-between cursor-pointer",
        selected && "text-texticon-onnormal-black body-s-semibold",
        !selected && "text-texticon-onnormal-highemp body-s-regular"
      )}
    >
      <span>{label}</span>
      {selected && icon && <span>{icon}</span>}
    </div>
  );
}
