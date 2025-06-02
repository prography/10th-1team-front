import { cn } from "@/utils/cn";
import { dividerVariants } from "./dividerVariants";
import { type VariantProps } from "class-variance-authority";

type DividerProps = {
  orientation?: "horizontal" | "vertical";
  className?: string;
  thickness?: number;
} & VariantProps<typeof dividerVariants>;

export default function Divider({
  orientation = "horizontal",
  className,
  variant,
  thickness = 8,
}: DividerProps) {
  return (
    <div
      className={cn(
        dividerVariants({ variant }),
        orientation === "horizontal"
          ? `w-full h-[${thickness}px]`
          : `h-full w-[${thickness}px]`,
        className
      )}
    />
  );
}
