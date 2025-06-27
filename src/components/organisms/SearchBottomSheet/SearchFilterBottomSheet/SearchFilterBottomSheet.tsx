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
import { useState } from "react";
import type { CategoryType } from "@/types/search";

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

  const handleDone = () => {
    updateFoodTypes(selectedCategory);
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
            <RegionFilter />
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
