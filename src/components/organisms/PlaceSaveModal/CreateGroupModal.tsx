import React, { useState } from "react";
import BottomSheet from "@/components/molecules/BottomSheet/BottomSheet";
import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import Icon from "@/components/atoms/Icon/Icon";
import { cn } from "@/utils/cn";

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  onCreateGroup: (groupName: string, selectedColor: string) => void;
}

// 각 색상에 대한 선택된 상태의 border 클래스를 반환하는 함수
const getSelectedBorderClass = (color: string) => {
  switch (color) {
    case "#FF5252":
      return "outline outline-4 outline-[#FF5252]/20 scale-110";
    case "#FFD600":
      return "outline outline-4 outline-[#FFD600]/20 scale-110";
    case "#7ED957":
      return "outline outline-4 outline-[#7ED957]/20 scale-110";
    case "#4FC3F7":
      return "outline outline-4 outline-[#4FC3F7]/20 scale-110";
    case "#BA68C8":
      return "outline outline-4 outline-[#BA68C8]/20 scale-110";
    default:
      return "outline outline-4 outline-gray-400/20 scale-110";
  }
};

const DEFAULT_ICON_COLORS = [
  "#FF5252",
  "#FFD600",
  "#7ED957",
  "#4FC3F7",
  "#BA68C8",
];

export default function CreateGroupModal({
  isOpen,
  title = "새로운 그룹 만들기",
  onClose,
  onCreateGroup,
}: CreateGroupModalProps) {
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateGroup = async () => {
    if (!groupName || !selectedColor) return;

    setIsCreating(true);
    try {
      await onCreateGroup(groupName, selectedColor);
      // 성공 후 상태 초기화
      setGroupName("");
      setSelectedColor("");
      onClose();
    } catch (error) {
      console.error("그룹 생성 실패:", error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleClose = () => {
    // 모달 닫을 때 상태 초기화
    setGroupName("");
    setSelectedColor("");
    setIsCreating(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <BottomSheet title={title} onClose={handleClose} showOverlay={true}>
      <div className="flex flex-col gap-[8px]">
        <div className="px-[16px] py-[12px] body-l-semibold text-texticon-onnormal-highestemp">
          그룹 이름
        </div>
        <div className="self-stretch px-[16px] items-center">
          <div className="flex w-full">
            <div className="flex w-full border-b border-border-primary-500">
              <div className="flex-1 w-full">
                <Input
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  maxLength={20}
                  placeholder="새 그룹 명을 입력해주세요"
                  className="flex-1 body-m-semibold text-texticon-onnormal-highestemp"
                  autoFocus
                />
              </div>
              <div className="flex items-center whitespace-nowrap ml-2">
                <span className="caption-m-semibold text-texticon-onnormal-midemp">
                  {groupName.length}
                </span>
                <span className="caption-s-regular text-texticon-onnormal-lowemp">
                  /20
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col px-[16px] py-[12px] gap-[12px]">
          <div className="body-l-semibold text-texticon-onnormal-highestemp">
            아이콘
          </div>
          <div className="flex gap-[24px] mb-[33px]">
            {DEFAULT_ICON_COLORS.map((color) => (
              <div
                key={color}
                className={cn(
                  "w-[24px] h-[24px] rounded-full cursor-pointer transition-all flex items-center justify-center",
                  selectedColor === color
                    ? getSelectedBorderClass(color)
                    : "hover:border hover:border-border-normal-midemp"
                )}
                onClick={() => setSelectedColor(color)}
              >
                <Icon icon="Group" size={24} fill={color} />
              </div>
            ))}
          </div>
        </div>
        <div className="px-[16px] py-[14px] mb-[24px]">
          <Button
            variant="primary"
            fullWidth
            className="h-[56px]"
            disabled={!groupName || selectedColor === "" || isCreating}
            onClick={handleCreateGroup}
          >
            완료
          </Button>
        </div>
      </div>
    </BottomSheet>
  );
}
