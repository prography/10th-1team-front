import React from "react";
import type { DongInfo } from "@/types/region";
import IconButton from "@/components/molecules/IconButton/IconButton";
import Icon from "@/components/atoms/Icon/Icon";
import Button from "@/components/atoms/Button/Button";

interface SelectedDongTagsProps {
  isOverflow?: boolean;
  selectedDong: DongInfo[];
  handleRemoveRegion: (dong: DongInfo) => void;
}

const TAG_BUTTON_CLASSNAME =
  "button-m-medium inline-flex flex-shrink-0 items-center gap-[4px] px-[12px] bg-etc-location-tab-button rounded-[4px] text-texticon-onnormal-highemp";

const SelectedDongTags: React.FC<SelectedDongTagsProps> = ({
  isOverflow = true,
  selectedDong,
  handleRemoveRegion,
}) => {
  const isOverflowing = isOverflow && selectedDong.length > 1;
  if (!selectedDong.length) return null;
  return (
    <>
      {isOverflowing && (
        <Button
          key={selectedDong[0].dong_code}
          className={TAG_BUTTON_CLASSNAME}
        >
          <span className="button-m-medium ">{selectedDong[0].name} 외 </span>
          <span className="caption-m-semibold text-texticon-onnormal-main-500">
            {selectedDong.length - 1}
          </span>
        </Button>
      )}
      {selectedDong.map((dong) => (
        <IconButton
          key={dong.dong_code}
          className={TAG_BUTTON_CLASSNAME}
          text={dong.name}
          onClick={() => handleRemoveRegion(dong)}
          endIcon={<Icon icon="Exit" size={16} />}
        />
      ))}
    </>
  );
};

export default SelectedDongTags;
