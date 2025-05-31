import { useState, useCallback } from "react";
import { useRegionQueries } from "../../../hooks/queries/useRegionQueries";
import useRegionStore from "@/store/useRegionStore";
import { DongInfo } from "@/types/region";

export function useRegionSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSelectedRegion, setHasSelectedRegion] = useState(false); // 시/구 선택 여부
  const {
    selectedProvince: storeProvince,
    selectedCity: storeCity,
    selectedDong: storeDong,
    setRegion,
  } = useRegionStore();

  // 모달 내부에서 사용할 임시 상태
  const [tempProvince, setTempProvince] = useState<string>("");
  const [tempCity, setTempCity] = useState<string>("");
  const [tempDong, setTempDong] = useState<DongInfo[]>([]);

  const { data: regions, isLoading } = useRegionQueries();

  const openRegionSelector = useCallback(() => {
    setTempProvince(storeProvince);
    setTempCity(storeCity);
    setTempDong(storeDong);
    setIsOpen(true);
    setHasSelectedRegion(false);
  }, [storeProvince, storeCity, storeDong]);

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
  };
}
