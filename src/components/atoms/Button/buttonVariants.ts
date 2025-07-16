import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center transition-colors disabled:cursor-not-allowed select-none cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "rounded-[8px] bg-button-primary-bg_main text-button-primary-text_default button-l-semibold hover:bg-button-primary-bg_pressed hover:text-button-primary-text_pressed active:bg-button-primary-bg_pressed active:text-button-primary-text_pressed disabled:bg-button-primary-bg_disabled disabled:text-button-primary-text_disabled",
        neutral:
          "rounded-[8px] box-border border border-button-neutral-border bg-button-neutral-bg_default text-button-neutral-text_default button-l-semibold hover:bg-button-neutral-bg_pressed hover:text-button-neutral-text_pressed active:bg-button-neutral-bg_pressed active:text-button-neutral-text_pressed disabled:bg-button-neutral-bg_disabled disabled:text-button-neutral-text_disabled",
        secondary:
          "rounded-[8px] bg-button-secondary-bg_main text-button-secondary-text_default button-l-semibold hover:bg-button-secondary-bg_pressed hover:text-button-secondary-text_pressed active:bg-button-secondary-bg_pressed active:text-button-secondary-text_pressed disabled:bg-button-secondary-bg_disabled disabled:text-button-secondary-text_disabled",
        brandNaver:
          "rounded-[8px] py-[16px] button-l-semibold text-button-primary-text_default bg-brand-naver-main",
        brandKakao:
          "rounded-[8px] py-[16px] button-l-semibold text-[#3D1D1C] bg-brand-kakao-main",
        filterDefault:
          "rounded-[4px] bg-button-neutral-bg_defualt text-texticon-onnormal-midemp caption-m-semibold border border-border-normal-lowemp px-[12px] h-[36px] rounded-[99px]",
        filterActive:
          "rounded-[4px] caption-m-semibold bg-texticon-onnormal-highestemp border-border-normal-highestemp text-texticon-onnormal-white px-[12px] h-[36px] rounded-[99px]",
        filterOption:
          "rounded-[4px] bg-button-secondary-bg_default text-button-secondary-text_default button-s-medium border border-brand-primary-main px-[12px] h-[36px] rounded-[99px]",
        filterSingle:
          "rounded-[4px] bg-button-neutral-bg_default text-button-neutral-text_default caption-m-regular border border-button-neutral-border disabled:bg-button-secondary-bg_disabled disabled:text-button-secondary-text_disabled py-[12px]",
        filterMulti:
          "rounded-[4px] bg-surface-normal-bg01 text-onnormal-highemp caption-m-regular border border-transparent py-[6px]",
        filterLabel:
          "rounded-[4px] bg-button-secondary-bg_pressed text-button-secondary-text_pressed button-s-medium px-[14px] py-[5px]",
        filterLocationLabel:
          "rounded-[4px] bg-etc-location-tab-button button-s-medium px-[14px] py-[5px] flex items-center gap-[2px]",
        text: "bg-transparent",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "text",
      fullWidth: false,
    },
  }
);
