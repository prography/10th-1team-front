import { ButtonHTMLAttributes } from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { buttonVariants } from "./buttonVariants";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isPressed?: boolean;
}

export default function Button({
  variant,
  className,
  fullWidth,
  disabled = false,
  isPressed = false,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        buttonVariants({ variant, fullWidth }),
        isPressed && "pressed",
        className
      )}
      disabled={disabled}
      {...props}
    />
  );
}
