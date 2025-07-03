"use client";

import { ReactNode, useState } from "react";
import IconButton from "@/components/molecules/IconButton/IconButton";
import Icon from "@/components/atoms/Icon/Icon";
import { cn } from "@/utils/cn";

interface BottomSheetProps {
  onClose: () => void;
  children: ReactNode;
  className?: string;
  title?: string;
}

export default function BottomSheet({
  onClose,
  children,
  className = "",
  title,
}: BottomSheetProps) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAnimationEnd = () => {
    if (!open) onClose();
  };

  return (
    <>
      <div
        className={cn(
          "fixed w-full max-w-[600px] left-1/2 transform -translate-x-1/2 inset-y-0 bg-black/60 z-40",
          !open && "hidden"
        )}
        onClick={handleClose}
        aria-label="닫기 오버레이"
      />
      <div
        className={cn(
          "fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[600px] bg-white rounded-t-xl z-50 shadow-lg flex flex-col",
          open ? "slide-up" : "slide-down",
          className
        )}
        role="dialog"
        onAnimationEnd={handleAnimationEnd}
      >
        {title && (
          <div className="sticky top-0 w-full flex justify-between items-center px-[16px] pt-[24px] pb-[14px] border-b border-border-normal-lowemp">
            <h2 className="body-m-regular text-black">{title}</h2>
            <IconButton onClick={handleClose} endIcon={<Icon icon="Exit" />} />
          </div>
        )}
        {children}
      </div>
    </>
  );
}
