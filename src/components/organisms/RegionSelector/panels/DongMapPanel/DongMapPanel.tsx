"use client";

import Button from "@/components/atoms/Button/Button";
import RegionMapDisplay from "@/components/molecules/RegionMapDisplay/RegionMapDisplay";
import SelectedDongTags from "@/components/molecules/SelectedDongTags/SelectedDongTags";
import { useDongMapPanel } from "@/components/organisms/RegionSelector/panels/DongMapPanel/useDongMapPanel";
import type { DongInfo, Region } from "@/types/region";

interface DongMapPanelProps {
  selectedDong: DongInfo[];
  onChangeSelectedDong: (regions: DongInfo[]) => void;
  onSelect: (dongList: DongInfo[]) => void;
  selectedProvince: string;
  selectedCity: string;
  onBack: () => void;
  regionMapData: Region[];
}

export default function DongMapPanel({
  selectedDong,
  onChangeSelectedDong,
  onSelect,
  selectedProvince,
  selectedCity,
  onBack,
  regionMapData,
}: DongMapPanelProps) {
  const {
    zoomIndex,
    position,
    isDragging,
    containerRef,
    isOverflow,
    tagContainerRef,
    currentScale,
    handleRegionClick,
    onToggleSelectAll,
    handleRemoveRegion,
    handleConfirm,
    handleMouseDown,
    handleMouseMove,
    doZoomIn,
    doZoomOut,
    handleTagContainerMouseDown,
  } = useDongMapPanel(
    selectedDong,
    onChangeSelectedDong,
    onSelect,
    regionMapData
  );
  const isAllDongSelected =
    selectedDong.length === (regionMapData ? regionMapData.length : 0);
  return (
    <>
      <div className="px-[16px] py-[8px] bg-Surface-Normal-Container0 inline-flex justify-between items-center">
        <div className="text-brand-primary-main body-m-semibold">
          {selectedProvince} {selectedCity}
        </div>
        <Button
          variant="neutral"
          onClick={onToggleSelectAll}
          disabled={!regionMapData}
          isPressed={isAllDongSelected}
          className="button-s-medium rounded-[4px] px-[8px] py-[8px] gap-[10px]"
        >
          {isAllDongSelected ? "전체 해제" : "전체 선택"}
        </Button>
      </div>
      {regionMapData ? (
        <>
          <div className="relative py-[15px] px-[6px] overflow-hidden">
            <div
              ref={containerRef}
              className="overflow-hidden touch-none"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
            >
              <RegionMapDisplay
                regions={regionMapData}
                selectedDong={selectedDong}
                isDragging={isDragging}
                position={position}
                scale={currentScale}
                onRegionClick={handleRegionClick}
              />
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 mb-4">
            <button
              onClick={doZoomOut}
              disabled={zoomIndex === 0}
              className="w-8 h-8 bg-white rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-black"
            >
              -
            </button>
            <div className="w-16 text-center text-sm text-black">
              {Math.round(currentScale * 100)}%
            </div>
            <button
              onClick={doZoomIn}
              disabled={zoomIndex === 6}
              className="w-8 h-8 bg-white rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-black"
            >
              +
            </button>
          </div>
          <div className="py-[8px] pl-[16px]">
            <div
              className="flex gap-[10px] overflow-x-auto whitespace-nowrap pb-2 min-h-[40px] scrollbar-hide cursor-grab active:cursor-grabbing"
              ref={tagContainerRef}
              style={{
                overflowX: "auto",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
              onMouseDown={handleTagContainerMouseDown}
            >
              <SelectedDongTags
                isOverflow={isOverflow}
                selectedDong={selectedDong}
                handleRemoveRegion={handleRemoveRegion}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="text-lg text-gray-500">
            {selectedCity}는 아직 지원하지 않습니다.
          </div>
        </div>
      )}
      <div className="flex gap-[8px] w-full px-[16px] py-[14px]">
        <Button className="flex-1 h-[56px]" variant="neutral" onClick={onBack}>
          뒤로
        </Button>
        <Button
          className="flex-1 h-[56px]"
          variant="primary"
          onClick={handleConfirm}
          disabled={!regionMapData}
        >
          완료
        </Button>
      </div>
    </>
  );
}
