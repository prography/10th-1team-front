import { cva } from "class-variance-authority";

export const dividerVariants = cva("flex justify-between", {
  variants: {
    variant: {
      normal: "bg-surface-normal-container10",
      strong: "bg-surface-normal-container10",
      weak: "bg-surface-normal-container10",
      border: "bg-border-normal-lowemp",
    },
  },
  defaultVariants: {
    variant: "normal",
  },
});
