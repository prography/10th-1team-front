import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/utils/cn";
import { VariantProps } from "class-variance-authority";
import { listVariants } from "./listVariants";

type ListProps<T extends ElementType> = {
  as?: T;
  className?: string;
  children: ReactNode;
} & VariantProps<typeof listVariants> &
  ComponentPropsWithoutRef<T>;

export default function List<T extends ElementType = "div">({
  variant,
  as,
  className,
  children,
  ...props
}: ListProps<T>) {
  const Component = as || "div";

  return (
    <Component className={cn(listVariants({ variant }), className)} {...props}>
      {children}
    </Component>
  );
}
