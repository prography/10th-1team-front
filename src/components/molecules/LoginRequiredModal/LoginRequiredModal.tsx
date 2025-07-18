import React from "react";
import Button from "@/components/atoms/Button/Button";

interface LoginRequiredModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onLogin: () => void;
}

export default function LoginRequiredModal({
  isOpen,
  onCancel,
  onLogin,
}: LoginRequiredModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-surface-normal-container0 rounded-[12px] flex flex-col items-center w-[304px]">
        <div className="title-m-semibold text-center mt-[24px]">
          로그인이 필요해요!
        </div>
        <div className="body-s-regular mt-[16px] mb-[12px] flex flex-col items-center justify-center w-full text-center">
          투표를 진행하시려면
          <br />
          로그인을 먼저 진행해주세요
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
