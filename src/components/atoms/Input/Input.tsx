import { InputHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/style";

const inputVariants = cva(
  "h-[24px] body-m-semibold focus:outline-none transition-colors caret-[#20A6FF]",
  {
    variants: {
      variant: {
        default:
          "border-border-normal-lowemp focus:border-border-normal-highemp",
        error:
          "border-border-normal-highemp focus:border-border-normal-highemp",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      fullWidth: false,
    },
  }
);

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  error?: boolean;
}

export default forwardRef<HTMLInputElement, InputProps>(function Input(
  { error = false, fullWidth, className, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={cn(
        inputVariants({
          variant: error ? "error" : "default",
          fullWidth,
          className,
        })
      )}
      {...props}
    />
  );
});
