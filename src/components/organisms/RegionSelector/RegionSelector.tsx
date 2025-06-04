import React from "react";
import IconButton from "@/components/molecules/IconButton/IconButton";
import Icon from "@/components/atoms/Icon/Icon";
import RegionListPanel from "./panels/RegionListPanel/RegionListPanel";
import DongMapPanel from "./panels/DongMapPanel/DongMapPanel";
import { Province, DongInfo } from "@/types/region";
import clsx from "clsx";

interface RegionSelectorProps {
  isOpen: boolean;
  hasSelectedRegion: boolean;
  regions?: Province[];
  selectedProvince: string;
  selectedCity: string;
  selectedDong: DongInfo[];
  onNext: (province: string, city: string) => void;
  onClose: () => void;
  onSelect: (dongList: DongInfo[]) => void;
  onBack: () => void;
  onChangeSelectedDong: (dongList: DongInfo[]) => void;
  isLoading: boolean;
}

const RegionSelector: React.FC<RegionSelectorProps> = ({
  isOpen,
  hasSelectedRegion,
  regions,
  selectedProvince,
  selectedCity,
  selectedDong,
  onNext,
  onClose,
  onSelect,
  onBack,
  onChangeSelectedDong,
  isLoading = true,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div
        className={clsx(
          "bg-surface-normal-container0 rounded-xl w-[90%] max-w-[480px] text-black flex flex-col",
          { "h-[546px]": !hasSelectedRegion }
        )}
      >
        <div className="self-stretch pl-[16px] pr-[6px] pt-[14px] pb-[10px] border-b border-border-normal-lowemp inline-flex justify-between items-center">
          <h2 className="body-m-regular text-black">검색 지역 설정</h2>
          <IconButton onClick={onClose} endIcon={<Icon icon="Exit" />} />
        </div>
        {isLoading ? (
          <div></div>
        ) : !hasSelectedRegion && regions ? (
          <RegionListPanel
            regions={regions}
            selectedProvince={selectedProvince}
            selectedCity={selectedCity}
            onNext={onNext}
          />
        ) : (
          <DongMapPanel
            selectedProvince={selectedProvince}
            selectedCity={selectedCity}
            selectedDong={selectedDong}
            onChangeSelectedDong={onChangeSelectedDong}
            onSelect={onSelect}
            onBack={onBack}
          />
        )}
      </div>
    </div>
  );
};

export default RegionSelector;
