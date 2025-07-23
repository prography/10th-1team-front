import React from "react";
import Button from "@/components/atoms/Button/Button";

interface BasicConfirmModalProps {
  isOpen: boolean;
  title: string;
  description?: string | React.ReactNode;
  cancelText?: string;
  confirmText: string;
  onCancel: () => void;
  onConfirm: () => void;
  variant?: "secondary" | "primary";
}

export default function BasicConfirmModal({
  isOpen,
  title,
  description,
  cancelText = "취소",
  confirmText,
  onCancel,
  onConfirm,
  variant = "primary",
}: BasicConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-surface-normal-container0 rounded-[12px] flex flex-col items-center w-[304px]">
        <div className="title-m-semibold text-center mt-[24px]">{title}</div>
        {description && (
          <div className="body-s-regular mt-[16px] mb-[12px] flex flex-col items-center justify-center w-full text-center">
            {description}
          </div>
        )}
        <div className="flex py-[14px] px-[16px] gap-[6px] w-full">
          <Button
            variant="neutral"
            className="flex-1 h-[56px] button-l-semibold"
            onClick={onCancel}
          >
            {cancelText}
          </Button>
          <Button
            variant={variant === "secondary" ? "secondary" : "primary"}
            className="flex-1 h-[56px] button-l-semibold"
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
