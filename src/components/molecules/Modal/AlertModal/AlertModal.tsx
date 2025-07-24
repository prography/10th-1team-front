import Button from "@/components/atoms/Button/Button";
import { cn } from "@/utils/cn";
import { allowScroll, preventScroll } from "@/utils/modal";
import { useEffect } from "react";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  leftButtonText?: string;
  rightButtonText?: string;
  onLeftButtonClick?: () => void;
  onRightButtonClick?: () => void;
  scrollable?: boolean;
  showOverlay?: boolean;
  className?: string;
}

export default function AlertModal({
  isOpen,
  onClose,
  title,
  description,
  leftButtonText,
  rightButtonText,
  onLeftButtonClick,
  onRightButtonClick,
  scrollable = false,
  showOverlay = true,
  className = "",
}: AlertModalProps) {
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
      >
        <div className="w-full bg-surface-normal-container0 rounded-[12px] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.12)] inline-flex flex-col">
          <div className="flex flex-col items-center justify-center gap-[16px] mt-[28px] mb-[12px]">
            <div className="title-m-semibold text-texticon-onnormal-highestemp">
              {title}
            </div>
            {description && (
              <div className="body-s-regular text-texticon-onnormal-midemp text-center whitespace-pre-line">
                {description}
              </div>
            )}
          </div>
          <div className="flex py-[14px] px-[16px] gap-[6px] w-full ">
            {leftButtonText && (
              <Button
                variant="neutral"
                className="flex-1 h-[56px] button-l-semibold"
                onClick={onLeftButtonClick}
              >
                {leftButtonText}
              </Button>
            )}
            {rightButtonText && (
              <Button
                variant="primary"
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
