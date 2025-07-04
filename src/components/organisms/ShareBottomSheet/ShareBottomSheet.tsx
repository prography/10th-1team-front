import BottomSheet from "@/components/molecules/BottomSheet/BottomSheet";
import Button from "@/components/atoms/Button/Button";
import React from "react";
import { useModalStore } from "@/store/useModalStore";
import Icon from "@/components/atoms/Icon/Icon";

interface ShareBottomSheetProps {
  url: string;
  placeName: string;
  onClose: () => void;
  isOpen: boolean;
}

export default function ShareBottomSheet({
  url,
  placeName,
  onClose,
  isOpen,
}: ShareBottomSheetProps) {
  const openModal = useModalStore((state) => state.openModal);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      onClose();
      openModal("toast", {
        message: "URL이 클립보드에 복사되었습니다.",
        icon: <Icon size={24} icon="Complete" />,
      });
    } catch {
      alert("복사에 실패했습니다. 수동으로 복사해 주세요.");
    }
  };

  return (
    isOpen && (
      <BottomSheet title="공유하기" onClose={onClose}>
        <div className="flex flex-col">
          <div className="flex flex-col px-[16px] py-[12px] gap-[12px]">
            <div className="body-l-semibold">{placeName}</div>
            <input
              type="text"
              value={url}
              readOnly
              className="body-s-regular text-texticon-onnormal-midemp bg-surface-normal-container-b50 py-[8px] px-[4px] rounded-[4px]"
            />
          </div>
          <div className="px-[16px] py-[14px] mb-[24px]">
            <Button
              variant="neutral"
              className="w-full px-[16px] py-[14px]"
              onClick={handleCopy}
            >
              주소 복사하기
            </Button>
          </div>
        </div>
      </BottomSheet>
    )
  );
}
