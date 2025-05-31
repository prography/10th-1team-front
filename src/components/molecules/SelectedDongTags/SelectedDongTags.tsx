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

const SelectedDongTags: React.FC<SelectedDongTagsProps> = ({
  isOverflow = true,
  selectedDong,
  handleRemoveRegion,
}) => {
  if (!selectedDong.length) return null;
  return (
    <>
      {isOverflow && selectedDong.length > 1 && (
        <Button
          key={selectedDong[0].dong_code}
          className="button-m-medium inline-flex flex-shrink-0 items-center gap-[4px] px-[12px] bg-etc-location-tab-button rounded-[4px]"
        >
          <span className="button-m-medium text-texticon-onnormal-highemp">
            {selectedDong[0].name} 외{" "}
          </span>
          <span className="caption-m-semibold text-texticon-onnormal-main-500">
            {selectedDong.length - 1}
          </span>
        </Button>
      )}
      {selectedDong.map((dong: DongInfo) => (
        <IconButton
          key={dong.dong_code}
          className="button-m-medium inline-flex flex-shrink-0 items-center gap-[4px] px-[12px] text-texticon-onnormal-highemp bg-etc-location-tab-button rounded-[4px]"
          text={dong.name}
          onClick={() => handleRemoveRegion(dong)}
          endIcon={<Icon icon="Exit" size={16} />}
        />
      ))}
    </>
  );
};

export default SelectedDongTags;
