"use client";
import Icon from "@/components/atoms/Icon/Icon";
import IconButton from "@/components/molecules/IconButton/IconButton";

interface PlaceHeaderProps {
  onHome?: () => void;
  onBack?: () => void;
  placeName: string;
}

export default function PlaceHeader({
  onHome,
  onBack,
  placeName,
}: PlaceHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex items-center gap-[12px] w-full px-[16px] pb-[16px] pt-[24px]  bg-surface-normal-bg01 ">
      <IconButton
        startIcon={<Icon icon="Back" size={24} />}
        onClick={onBack}
        aria-label="뒤로가기"
      />
      <div className="flex-1 flex justify-center">
        <span className={`body-m-semibold text-black`}>{placeName}</span>
      </div>
      <IconButton
        startIcon={<Icon icon="Home" size={24} />}
        onClick={onHome}
        aria-label="홈으로"
      />
    </header>
  );
}
