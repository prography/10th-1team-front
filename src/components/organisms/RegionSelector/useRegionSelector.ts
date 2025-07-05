import { useState, useCallback } from "react";
import { useRegionQuery } from "@/hooks/queries/useRegionQuery";
import useRegionStore from "@/store/useRegionStore";
import GANGNAM_REGIONS from "@/constants/gangnamRegions";
import type { DongInfo, Region } from "@/types/region";

// 구별로 동 데이터 매핑
const REGION_MAP: Record<string, Record<string, Region[]>> = {
  서울특별시: {
    강남구: GANGNAM_REGIONS,
    // 서초구: SEOCHO_REGIONS,
    // ...추가 가능
  },
};

export function useRegionSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSelectedRegion, setHasSelectedRegion] = useState(false); // 시/구 선택 여부
  const {
    province: storeProvince,
    city: storeCity,
    dong: storeDong,
    setRegion,
  } = useRegionStore();

  // 모달 내부에서 사용할 임시 상태
  const [tempProvince, setTempProvince] = useState<string>("");
  const [tempCity, setTempCity] = useState<string>("");
  const [tempDong, setTempDong] = useState<DongInfo[]>([]);

  const { data: regions, isLoading } = useRegionQuery();
  const regionMapData = REGION_MAP[tempProvince]?.[tempCity];
  const openRegionSelector = useCallback(() => {
    setTempProvince("");
    setTempCity("");
    setTempDong([]);
    setIsOpen(true);
    setHasSelectedRegion(false);
  }, []);

  const closeRegionSelector = useCallback(() => {
    setIsOpen(false);
    setHasSelectedRegion(false);
  }, []);

  const handleNext = useCallback(
    (province: string, city: string) => {
      setHasSelectedRegion(true);
      setTempProvince(province);
      setTempCity(city);
      if (province !== storeProvince || city !== storeCity) {
        setTempDong([]);
      }
    },
    [storeProvince, storeCity]
  );

  const handleConfirm = useCallback(
    (dongList: DongInfo[]) => {
      setRegion(tempProvince, tempCity, dongList);
      closeRegionSelector();
    },
    [tempProvince, tempCity, setRegion, closeRegionSelector]
  );

  const handleBack = useCallback(() => {
    setHasSelectedRegion(false);
  }, []);

  const handleDongChange = setTempDong;

  return {
    isOpen,
    hasSelectedRegion,
    regions,
    isLoading,
    selectedProvince: tempProvince,
    selectedCity: tempCity,
    selectedDong: tempDong,
    openRegionSelector,
    closeRegionSelector,
    handleNext,
    handleConfirm,
    handleBack,
    handleDongChange,
    storeProvince,
    storeCity,
    storeDong,
    regionMapData,
    setRegion,
  };
}
