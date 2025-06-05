import { cn } from "@/utils/cn";
import { dividerVariants } from "./dividerVariants";
import { type VariantProps } from "class-variance-authority";

type OrientationType = "horizontal" | "vertical";
type Thickness = 1 | 2 | 4 | 8 | 12;

const thicknessClassMap: Record<OrientationType, Record<Thickness, string>> = {
  horizontal: {
    1: "h-[1px]",
    2: "h-[2px]",
    4: "h-[4px]",
    8: "h-[8px]",
    12: "h-[12px]",
  },
  vertical: {
    1: "w-[1px]",
    2: "w-[2px]",
    4: "w-[4px]",
    8: "w-[8px]",
    12: "w-[12px]",
  },
};

type DividerProps = {
  orientation?: OrientationType;
  className?: string;
  thickness?: Thickness;
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
          ? `${thicknessClassMap[orientation][thickness]} w-full`
          : `${thicknessClassMap[orientation][thickness]} h-full`,
        className
      )}
    />
  );
}
