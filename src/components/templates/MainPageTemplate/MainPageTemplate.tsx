"use client";

import MainHeader from "@/components/organisms/MainHeader/MainHeader";
import Footer from "@/components/molecules/Footer/Footer";
import RecommendedStores from "@/components/organisms/RecommendedStores/RecommendedStores";
import RegionSelector from "@/components/organisms/RegionSelector/RegionSelector";
import IconButton from "@/components/molecules/IconButton/IconButton";
import Icon from "@/components/atoms/Icon/Icon";
import MainBannerSection from "./MainBannerSection";
import LocationSelectorSection from "./LocationSelectorSection";
import ExploreSection from "./ExploreSection";

import { colors } from "@/styles/colors";
import { useRouter } from "next/navigation";
import { useRegionSelector } from "@/components/organisms/RegionSelector/useRegionSelector";
import useRegionStore from "@/store/useRegionStore";

export default function MainPageTemplate() {
  const router = useRouter();
  const { selectedDong } = useRegionStore();
  const {
    isOpen,
    hasSelectedRegion,
    selectedProvince,
    selectedCity,
    openRegionSelector,
    closeRegionSelector,
    handleNext,
    handleConfirm,
    handleBack,
    handleDongChange,
    regionMapData,
  } = useRegionSelector();

  return (
    <div className="flex flex-col w-full bg-surface-normal-container0">
      <MainHeader />

      <MainBannerSection />

      <div className="flex flex-col py-[12px] px-[16px] gap-[12px]">
        <LocationSelectorSection
          selectedDong={selectedDong}
          onClick={openRegionSelector}
        />

        <IconButton
          text="ex. 강남역 라떼가 맛있는 카페 또는 상호명"
          endIcon={
            <Icon
              icon="Search"
              size={24}
              stroke={colors.TextIcon.OnNormal.Black}
            />
          }
          onClick={() => {
            router.push("/search");
          }}
          className="self-stretch flex items-center text-left justify-between px-[16px] py-[14px] body-s-regular text-texticon-onnormal-midemp bg-surface-normal-container0 rounded-lg shadow-[0px_1px_8px_0px_rgba(0,0,0,0.12)] overflow-hidden"
        />
      </div>

      <ExploreSection />

      <RecommendedStores />

      <Footer />

      <RegionSelector
        {...{
          isOpen,
          hasSelectedRegion,
          selectedProvince,
          selectedCity,
          selectedDong,
          onNext: handleNext,
          onClose: closeRegionSelector,
          onSelect: handleConfirm,
          onBack: handleBack,
          onChangeSelectedDong: handleDongChange,
          regionMapData,
        }}
      />
    </div>
  );
}
