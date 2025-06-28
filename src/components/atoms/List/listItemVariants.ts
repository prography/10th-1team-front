import { cva } from "class-variance-authority";

export const listItemVariants = cva("flex justify-between", {
  variants: {
    variant: {
      "history-search":
        "p-[16px] hover:bg-surface-normal-container-b10 border-b-[0.5px] border-border-normal-lowemp",
      "auto-complete":
        "flex-col p-[16px] hover:bg-surface-normal-container-b10 border-b-[0.5px] border-border-normal-lowemp",
      default: "flex-col",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
