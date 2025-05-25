import { cva } from "class-variance-authority";

export const inputVariants = cva(
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
