import { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

export const buttonVariants = cva(
  "inline-flex items-center justify-center transition-colors disabled:cursor-not-allowed select-none cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "rounded-[8px] bg-button-primary-bg_main text-button-primary-text_default button-l-semibold hover:bg-button-primary-bg_pressed hover:text-button-primary-text_pressed active:bg-button-primary-bg_pressed active:text-button-primary-text_pressed disabled:bg-button-primary-bg_disabled disabled:text-button-primary-text_disabled [&.pressed]:bg-button-primary-bg_pressed [&.pressed]:text-button-primary-text_pressed",
        neutral:
          "rounded-[8px] box-border border border-button-neutral-border bg-button-neutral-bg_default text-button-neutral-text_default button-l-semibold hover:bg-button-neutral-bg_pressed hover:text-button-neutral-text_pressed active:bg-button-neutral-bg_pressed active:text-button-neutral-text_pressed disabled:bg-button-neutral-bg_disabled disabled:text-button-neutral-text_disabled [&.pressed]:bg-button-neutral-bg_pressed [&.pressed]:text-button-neutral-text_pressed",
        secondary:
          "rounded-[8px] bg-button-secondary-bg_main text-button-secondary-text_default button-l-semibold hover:bg-button-secondary-bg_pressed hover:text-button-secondary-text_pressed active:bg-button-secondary-bg_pressed active:text-button-secondary-text_pressed disabled:bg-button-secondary-bg_disabled disabled:text-button-secondary-text_disabled [&.pressed]:bg-button-secondary-bg_pressed [&.pressed]:text-button-secondary-text_pressed",
        brandNaver:
          "rounded-[8px] bg-brand-naver-light text-brand-naver-main button-l-semibold hover:border hover:border-brand-naver-main active:border active:border-brand-naver-main disabled:bg-button-neutral-bg_disabled disabled:text-button-neutral-text_disabled disabled:hover:border-none [&.pressed]:border [&.pressed]:border-brand-naver-main",
        brandKakao:
          "rounded-[8px] bg-brand-kakao-light text-brand-kakao-deep button-l-semibold hover:border hover:border-brand-kakao-deep active:border active:border-brand-kakao-deep disabled:bg-button-neutral-bg_disabled disabled:text-button-neutral-text_disabled disabled:hover:border-none [&.pressed]:border [&.pressed]:border-brand-kakao-deep",
        none: "",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "none",
      fullWidth: false,
    },
  }
);

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
