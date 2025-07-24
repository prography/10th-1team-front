import Button from "@/components/atoms/Button/Button";
import Icon from "@/components/atoms/Icon/Icon";
import Input from "@/components/atoms/Input/Input";
import BottomSheet from "@/components/molecules/BottomSheet/BottomSheet";
import { cn } from "@/utils/cn";

const iconColors = ["#FF5252", "#FFD600", "#7ED957", "#4FC3F7", "#BA68C8"];

interface GroupWithInputBottomSheetProps {
  title: string;
  groupName: string;
  selectedColor: string;
  onGroupNameChange: (value: string) => void;
  onColorSelect: (color: string) => void;
  onClose: () => void;
  onDone: () => void;
}

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

export default function GroupWithInputBottomSheet({
  onClose,
  title,
  groupName,
  onGroupNameChange,
  selectedColor,
  onColorSelect,
  onDone,
}: GroupWithInputBottomSheetProps) {
  return (
    <BottomSheet title={title} onClose={onClose}>
      {/* 그룹 이름 */}
      <div>
        <div className="flex flex-col gap-[8px] py-[12px] px-[16px] mb-[8px]">
          <div className="body-m-semibold text-texticon-onnormal-highestemp">
            그룹 이름
          </div>
          <div className="self-stretch items-center">
            <div className="flex w-full">
              <div className="flex w-full py-[8px] border-b border-border-primary-500">
                <div className="flex-1 w-full">
                  <Input
                    type="text"
                    value={groupName}
                    onChange={(e) => onGroupNameChange(e.target.value)}
                    maxLength={20}
                    placeholder="새 그룹 명을 입력해주세요"
                    className="flex-1 body-s-semibold text-texticon-onnormal-highestemp"
                    autoFocus
                  />
                </div>
                <div className="flex items-center whitespace-nowrap ml-2">
                  <span className="caption-m-semibold text-texticon-onnormal-midemp">
                    {groupName.length}
                  </span>
                  <span className="caption-m-regular text-texticon-onnormal-lowemp">
                    /20
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 아이콘 */}
        <div className="flex flex-col gap-[12px] py-[12px] px-[16px] mb-[30px]">
          <div className="body-m-semibold text-texticon-onnormal-highestemp">
            아이콘
          </div>
          <div className="flex gap-[24px]">
            {iconColors.map((color) => (
              <div
                key={color}
                className={cn(
                  "w-[24px] h-[24px] rounded-full cursor-pointer transition-all flex items-center justify-center",
                  selectedColor === color && getSelectedBorderClass(color)
                )}
                onClick={() => onColorSelect(color)}
              >
                <Icon icon="Group" size={24} fill={color} />
              </div>
            ))}
          </div>
        </div>

        {/* 완료 버튼 */}
        <div className="px-[16px] py-[14px] mb-[24px]">
          <Button
            variant="primary"
            fullWidth
            className="h-[56px]"
            disabled={!groupName || !selectedColor}
            onClick={onDone}
          >
            완료
          </Button>
        </div>
      </div>
    </BottomSheet>
  );
}
