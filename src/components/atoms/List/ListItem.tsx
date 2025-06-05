import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { listItemVariants } from "./listItemVariants";

type ListItemProps<T extends ElementType> = {
  as?: T;
  className?: string;
  children: ReactNode;
} & VariantProps<typeof listItemVariants> &
  ComponentPropsWithoutRef<T>;

export default function ListItem<T extends ElementType = "div">({
  variant,
  className,
  children,
  as,
  ...props
}: ListItemProps<T>) {
  const Component = as || "div";

  return (
    <Component
      className={cn(listItemVariants({ variant }), className)}
      {...props}
    >
      {children}
    </Component>
  );
}
