import { InputHTMLAttributes, forwardRef } from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { inputVariants } from "./inputVariants";

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
