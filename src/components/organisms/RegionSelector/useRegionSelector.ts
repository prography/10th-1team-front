import { useState, useCallback } from "react";
import { useRegionQuery } from "@/hooks/queries/useRegionQuery";
import useRegionStore from "@/store/useRegionStore";
import GANGNAM_REGIONS from "@/constants/gangnamRegions";
import type { DongInfo, Region, RegionDongData } from "@/types/region";
import dongJsonData from "@/constants/regions.json";

// 구별로 동 데이터 매핑
const REGION_MAP: Record<string, Record<string, Region[]>> = {
  서울: {
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
  // 특정 구의 동 리스트를 반환하는 함수
  const getDongListByCity = useCallback((city: string): DongInfo[] => {
    const regionData = dongJsonData as RegionDongData;
    const dongList = regionData[city];

    if (!dongList) {
      return [];
    }

    return dongList.map((dong) => ({
      name: dong.name,
      dong_code: dong.dong_code,
    }));
  }, []);

  // region JSON에서 동 리스트 가져오기
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const regionDongData = tempCity ? getDongListByCity(tempCity) : [];
  const openRegionSelector = useCallback(() => {
    setTempProvince("서울");
    setTempCity("강남구");
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
      setRegion(
        tempProvince,
        tempCity,
        dongList,
        dongList.length === (regionDongData.length || 0)
      );
      closeRegionSelector();
    },
    [tempProvince, tempCity, setRegion, closeRegionSelector, regionDongData]
  );

  const handleBack = useCallback(() => {
    setHasSelectedRegion(false);
  }, []);

  const handleDongChange = setTempDong;

  // 동이름으로 해당하는 동의 동코드와 이름을 반환하는 함수
  const getDongInfoByName = useCallback(
    (dongName: string): { dong_code: string; name: string } | null => {
      const regionData = dongJsonData as RegionDongData;

      // 모든 구를 순회하면서 해당 동이름을 찾습니다
      for (const city in regionData) {
        const dongList = regionData[city];
        const foundDong = dongList.find((dong) => dong.name === dongName);

        if (foundDong) {
          return {
            dong_code: foundDong.dong_code,
            name: foundDong.name,
          };
        }
      }

      return null;
    },
    []
  );

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
    getDongListByCity,
    getDongInfoByName,
    storeProvince,
    storeCity,
    storeDong,
    regionDongData,
    regionMapData,
    setRegion,
    isDongAllSelected: storeDong.length === (regionDongData.length || 0),
  };
}
