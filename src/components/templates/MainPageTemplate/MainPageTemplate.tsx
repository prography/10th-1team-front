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
import MainSidebar from "@/components/organisms/MainSidebar/MainSidebar";

import { colors } from "@/styles/colors";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRegionSelector } from "@/components/organisms/RegionSelector/useRegionSelector";
import { usePortal } from "@/hooks/usePortal";
import useRegionStore from "@/store/useRegionStore";

import type { UserInfo } from "@/types/user";
import type { SearchResultItem } from "@/types/search";

interface MainPageTemplateProps {
  user: UserInfo | null;
  items: SearchResultItem[];
  isLoading: boolean;
  onLogout: () => void;
}

export default function MainPageTemplate({
  user,
  items,
  isLoading,
  onLogout,
}: MainPageTemplateProps) {
  const router = useRouter();
  const createPortal = usePortal();

  const { dong, isDongAllSelected, city } = useRegionStore();
  const {
    isOpen,
    hasSelectedRegion,
    regions,
    selectedProvince,
    selectedCity,
    selectedDong,
    openRegionSelector,
    closeRegionSelector,
    handleNext,
    handleConfirm,
    handleBack,
    handleDongChange,
    regionMapData,
    isLoading: isRegionSelectorLoading,
  } = useRegionSelector();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col w-full bg-surface-normal-container0">
      <MainHeader onSidebarOpen={() => setIsSidebarOpen(true)} />

      <MainBannerSection
        onClick={user ? () => {} : () => router.push("/login")}
      />

      <div className="flex flex-col py-[12px] px-[16px] gap-[12px]">
        <LocationSelectorSection
          selectedDong={dong}
          selectedCity={city}
          onClick={openRegionSelector}
          isDongAllSelected={isDongAllSelected}
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

      <RecommendedStores items={items} isLoading={isLoading} />

      <Footer />

      {isSidebarOpen &&
        createPortal(
          <MainSidebar
            onClose={() => setIsSidebarOpen(false)}
            onStart={() => router.push("/login")}
            onLogout={onLogout}
            user={user}
          />
        )}

      <RegionSelector
        {...{
          isOpen,
          regions,
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
          isLoading: isRegionSelectorLoading,
        }}
      />
    </div>
  );
}
