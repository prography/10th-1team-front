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
  const pressedClasses = (() => {
    if (!isPressed) return "";

    switch (variant) {
      case "filterMulti":
        return "border border-brand-primary-500 text-texticon-onnormal-main-500 caption-m-semibold";
      case "filterSingle":
        return "bg-button-secondary-bg_default text-button-secondary-text_default caption-m-semibold border-button-primary-bg_main";
      case "primary":
        return "bg-button-primary-bg_pressed text-button-primary-text_pressed";
      case "neutral":
        return "bg-button-neutral-bg_pressed text-button-neutral-text_pressed";
      default:
        return "";
    }
  })();

  return (
    <button
      type="button"
      className={cn(
        buttonVariants({ variant, fullWidth }),
        pressedClasses,
        className
      )}
      disabled={disabled}
      {...props}
    />
  );
}
