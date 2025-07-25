import React from "react";
import Icon from "@/components/atoms/Icon/Icon";
import Image from "next/image";

interface LevelUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc?: string;
}

export default function LevelUpModal({
  isOpen,
  onClose,
  imageSrc,
}: LevelUpModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed w-full max-w-[600px] z-40 flex items-center justify-center left-1/2 transform -translate-x-1/2 inset-y-0 bg-black/60">
      <div className="relative w-full max-w-[528px] px-[16px]">
        {/* 헤더 */}
        <div className="text-center title-l-bold text-texticon-onnormal-white">
          <span>LEVEL UP!</span>
          <br />
          <span>심판 레벨이 상승했어요</span>
        </div>

        {/* 메인 카드 - 전체 이미지 */}
        <div className="relative overflow-hidden rounded-[8px] shadow-lg my-[60px]">
          <Image
            src={imageSrc || "/images/LevelUp.svg"}
            alt="Level Up"
            width={328}
            height={184}
            className="h-auto w-full"
          />
        </div>

        {/* 닫기 버튼 */}
        <div className="flex items-center justify-center">
          <button
            onClick={onClose}
            className="rounded-full bg-black text-white transition-colors hover:bg-gray-800"
          >
            <Icon icon="PopupExit" size={48} />
          </button>
        </div>
      </div>
    </div>
  );
}
