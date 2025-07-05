import BottomSheet from "@/components/molecules/BottomSheet/BottomSheet";
import {
  ScrollTab,
  ScrollTabPanel,
  ScrollTabsContainer,
  ScrollTabsContent,
  ScrollTabsList,
} from "@/components/molecules/ScrollTabs";
import FoodTypeFilter from "./FoodTypeFilter";
import Divider from "@/components/atoms/Divider/Divider";
import RegionFilter from "./ResionFilter";
import Button from "@/components/atoms/Button/Button";
import { useSearchContext } from "@/contexts/SearchContext";
import { useState, useEffect } from "react";
import { useRegionSelector } from "@/components/organisms/RegionSelector/useRegionSelector";
import type { CategoryType } from "@/types/search";
import { DongInfo } from "@/types/region";

interface SearchFilterBottomSheetProps {
  onClose: () => void;
  initialTab: "foodType" | "region";
}

export default function SearchFilterBottomSheet({
  onClose,
  initialTab,
}: SearchFilterBottomSheetProps) {
  const { state, updateFoodTypes } = useSearchContext();
  const [selectedCategory, setSelectedCategory] = useState<
    CategoryType | undefined
  >(state.filters.foodTypes);

  // 지역 관련 상태 (store의 값으로 초기화)
  const { regions, storeProvince, storeCity, storeDong, setRegion } =
    useRegionSelector();

  // 임시 선택값
  const [tempProvince, setTempProvince] = useState(storeProvince);
  const [tempCity, setTempCity] = useState(storeCity);
  const [tempDong, setTempDong] = useState(storeDong);

  // 초기값 동기화 (필요시)
  useEffect(() => {
    setTempProvince(storeProvince);
    setTempCity(storeCity);
    setTempDong(storeDong);
  }, [storeProvince, storeCity, storeDong]);

  // RegionFilter에서 선택이 바뀔 때마다 임시값 갱신
  const handleRegionChange = (
    province: string,
    city: string,
    dongList: DongInfo[]
  ) => {
    setTempProvince(province);
    setTempCity(city);
    setTempDong(dongList);
  };

  // 초기화 버튼
  const handleRegionReset = () => {
    setTempProvince("");
    setTempCity("");
    setTempDong([]);
  };

  // 완료 버튼
  const handleDone = () => {
    updateFoodTypes(selectedCategory);
    setRegion(tempProvince, tempCity, tempDong); // store에 최종 적용
    onClose();
  };

  return (
    <BottomSheet title="검색 필터 설정" onClose={onClose} className="h-4/5">
      <ScrollTabsContainer defaultTab={initialTab}>
        <ScrollTabsList className="justify-between">
          <ScrollTab value="foodType" className="w-1/2">
            음식 종류
          </ScrollTab>
          <ScrollTab value="region" className="w-1/2">
            지역
          </ScrollTab>
        </ScrollTabsList>

        <ScrollTabsContent>
          <ScrollTabPanel value="foodType" className="py-[24px] px-[16px]">
            <FoodTypeFilter
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </ScrollTabPanel>

          <Divider />
          <ScrollTabPanel value="region" className="py-[24px] px-[16px]">
            <RegionFilter
              regions={regions ?? []}
              selectedProvince={tempProvince}
              selectedCity={tempCity}
              selectedDong={tempDong}
              onChange={handleRegionChange}
              onReset={handleRegionReset}
            />
          </ScrollTabPanel>
        </ScrollTabsContent>
      </ScrollTabsContainer>

      <div className="bg-surface-normal-container0 py-[14px] px-[16px] flex gap-[8px]">
        <Button
          onClick={onClose}
          variant="neutral"
          className="py-[16px] flex-1"
        >
          취소
        </Button>
        <Button
          variant="primary"
          className="py-[16px] flex-1"
          onClick={handleDone}
        >
          완료
        </Button>
      </div>
    </BottomSheet>
  );
}
