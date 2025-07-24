import React from "react";
import IconButton from "@/components/molecules/IconButton/IconButton";
import Icon from "@/components/atoms/Icon/Icon";
import RegionListPanel from "@/components/organisms/RegionSelector/panels/RegionListPanel/RegionListPanel";
import DongMapPanel from "@/components/organisms/RegionSelector/panels/DongMapPanel/DongMapPanel";
import clsx from "clsx";
import type { Province, DongInfo, Region } from "@/types/region";

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
  regionMapData: Region[];
  isLoading: boolean;
}

export default function RegionSelector({
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
  regionMapData,
  isLoading = true,
}: RegionSelectorProps) {
  if (!isOpen) return null;
  const showRegionListPanel = !isLoading && regions && !hasSelectedRegion;
  const showDongMapPanel = !isLoading && regions && hasSelectedRegion;
  return (
    <div className="fixed w-full max-w-[600px] left-1/2 transform -translate-x-1/2 inset-y-0 bg-black/60 flex justify-center items-center z-50">
      <div
        className={clsx(
          "bg-surface-normal-container0 rounded-xl w-[90%] max-w-[480px] text-black flex flex-col",
          { "h-[546px]": !hasSelectedRegion }
        )}
      >
        <div className="self-stretch pl-[16px] pr-[16px] pt-[14px] pb-[10px] border-b border-border-normal-lowemp inline-flex justify-between items-center">
          <h2 className="body-m-regular text-black">검색 지역 설정</h2>
          <IconButton onClick={onClose} endIcon={<Icon icon="Exit" />} />
        </div>
        {/* TODO: 나중에 스켈레톤 처리예정 */}
        {isLoading && <div>로딩중...</div>}
        {showRegionListPanel && (
          <RegionListPanel
            regions={regions}
            selectedProvince={selectedProvince}
            selectedCity={selectedCity}
            onNext={onNext}
          />
        )}
        {showDongMapPanel && (
          <DongMapPanel
            regionMapData={regionMapData}
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
}
