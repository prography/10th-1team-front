import { cva } from "class-variance-authority";

export const listVariants = cva("flex flex-col", {
  variants: {
    variant: {
      "search-list":
        "bg-surface-normal-container0 flex-1 overflow-y-auto min-h-0",
    },
  },
  defaultVariants: {
    variant: "search-list",
  },
});
