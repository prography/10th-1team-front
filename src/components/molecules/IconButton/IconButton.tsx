import { ButtonHTMLAttributes, ReactNode } from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/style";
import { buttonVariants } from "@/components/atoms/Button/Button";

interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isPressed?: boolean;
  text?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  gap?: number;
  fullWidth?: boolean;
}

export default function IconButton({
  variant = "none",
  className,
  disabled = false,
  isPressed = false,
  text,
  startIcon,
  endIcon,
  gap = 8,
  fullWidth = false,
  ...props
}: IconButtonProps) {
  const content = (
    <>
      {startIcon}
      {text && <span>{text}</span>}
      {endIcon}
    </>
  );

  return (
    <button
      type="button"
      className={cn(
        buttonVariants({ variant }),
        isPressed && "pressed",
        fullWidth && "w-full",
        className
      )}
      disabled={disabled}
      aria-pressed={isPressed}
      {...props}
      style={{ gap }}
    >
      {content}
    </button>
  );
}
