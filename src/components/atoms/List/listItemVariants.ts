import { cva } from "class-variance-authority";

export const listItemVariants = cva("flex justify-between", {
  variants: {
    variant: {
      "history-search":
        "p-[16px] hover:bg-surface-normal-container-b10 border-b-[0.5px] border-border-normal-lowemp",
      "auto-complete":
        "flex-col p-[16px] hover:bg-surface-normal-container-b10 border-b-[0.5px] border-border-normal-lowemp",
      "search-result": "p-[16px] border-b-[0.5px] border-border-normal-lowemp",
      "platform-vote":
        "bg-button-neutral-bg_default border border-button-neutral-border text-button-neutral-text_default hover:bg-surface-normal-container-b50 hover:text-texticon-onnormal-main-500 hover:border-brand-primary-main",
      "saved-group": "px-[16px] py-[12px] hover:bg-surface-normal-container10",
      default: "flex-col",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
