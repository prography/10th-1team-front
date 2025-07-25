import React, { useEffect } from "react";
import Button from "@/components/atoms/Button/Button";
import { cn } from "@/utils/cn";
import { allowScroll, preventScroll } from "@/utils/modal";

export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string | React.ReactNode;
  leftButtonText?: string;
  rightButtonText?: string;
  onLeftButtonClick?: () => void;
  onRightButtonClick?: () => void;
  rightButtonVariant?: "primary" | "secondary" | "neutral";
  leftButtonVariant?: "neutral" | "primary" | "secondary";
  scrollable?: boolean;
  showOverlay?: boolean;
  className?: string;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  title,
  description,
  leftButtonText,
  rightButtonText,
  onLeftButtonClick,
  onRightButtonClick,
  rightButtonVariant = "primary",
  leftButtonVariant = "neutral",
  scrollable = false,
  showOverlay = true,
  className = "",
}: ConfirmModalProps) {
  useEffect(() => {
    if (!scrollable) {
      const prevScrollY = preventScroll();
      return () => {
        allowScroll(prevScrollY);
      };
    }
  }, [scrollable]);

  if (!isOpen) return null;

  return (
    <>
      {showOverlay && (
        <div
          className={cn(
            "fixed w-full max-w-[600px] left-1/2 transform -translate-x-1/2 inset-y-0 bg-black/60 z-40",
            !isOpen && "hidden"
          )}
          onClick={onClose}
          aria-label="닫기 오버레이"
        />
      )}
      <div
        className={cn(
          "fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] p-[24px]",
          className
        )}
        role="dialog"
        aria-modal="true"
      >
        <div className="w-full bg-surface-normal-container0 rounded-[12px] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.12)] inline-flex flex-col items-center">
          <div className="flex flex-col items-center justify-center gap-[16px] mt-[28px] mb-[12px] w-full">
            <div className="title-m-semibold text-texticon-onnormal-highestemp text-center w-full">
              {title}
            </div>
            {description && (
              <div className="body-s-regular text-texticon-onnormal-midemp text-center whitespace-pre-line w-full">
                {description}
              </div>
            )}
          </div>
          <div className="flex py-[14px] px-[16px] gap-[6px] w-full">
            {leftButtonText && (
              <Button
                variant={leftButtonVariant}
                className="flex-1 h-[56px] button-l-semibold"
                onClick={onLeftButtonClick}
              >
                {leftButtonText}
              </Button>
            )}
            {rightButtonText && (
              <Button
                variant={rightButtonVariant}
                className="flex-1 h-[56px] button-l-semibold"
                onClick={onRightButtonClick}
              >
                {rightButtonText}
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
