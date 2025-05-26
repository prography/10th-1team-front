import { InputHTMLAttributes, ReactNode, forwardRef } from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { inputVariants } from "./inputVariants";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  error?: boolean;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  startAdornmentHeight?: string;
  endAdornmentHeight?: string;
}

export default forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    error = false,
    fullWidth,
    className,
    startAdornment,
    endAdornment,
    startAdornmentHeight = "24px",
    endAdornmentHeight = "24px",
    ...props
  },
  ref
) {
  return (
    <div className="relative flex items-center">
      {startAdornment && (
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2"
          style={{ height: startAdornmentHeight }}
        >
          {startAdornment}
        </div>
      )}
      <input
        ref={ref}
        className={cn(
          inputVariants({
            variant: error ? "error" : "default",
            fullWidth,
            className,
          }),
          startAdornment && "pl-[35px]",
          endAdornment && "pr-[35px]"
        )}
        {...props}
      />
      {endAdornment && (
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2"
          style={{ height: endAdornmentHeight }}
        >
          {endAdornment}
        </div>
      )}
    </div>
  );
});
