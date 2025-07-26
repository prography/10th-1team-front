import React from "react";
import Button from "@/components/atoms/Button/Button";

interface LoginRequiredModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onLogin: () => void;
  description?: string;
}

export default function LoginRequiredModal({
  isOpen,
  onCancel,
  onLogin,
  description,
}: LoginRequiredModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed w-full max-w-[600px] z-40 flex items-center justify-center left-1/2 transform -translate-x-1/2 inset-y-0 bg-black/60">
      <div className="bg-surface-normal-container0 rounded-[12px] flex flex-col items-center w-[304px]">
        <div className="title-m-semibold text-center mt-[24px]">
          로그인이 필요해요!
        </div>
        <div className="body-s-regular mt-[16px] mb-[12px] flex flex-col items-center justify-center w-full text-center whitespace-pre-line">
          {description}
        </div>
        <div className="flex py-[14px] px-[16px] gap-[6px] w-full ">
          <Button
            variant="neutral"
            className="flex-1 h-[56px] button-l-semibold"
            onClick={onCancel}
          >
            취소
          </Button>
          <Button
            variant="primary"
            className="flex-1 h-[56px]button-l-semibold"
            onClick={onLogin}
          >
            로그인 할게요
          </Button>
        </div>
      </div>
    </div>
  );
}
