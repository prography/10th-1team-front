import Button from "@/components/atoms/Button/Button";
import Icon from "@/components/atoms/Icon/Icon";
import IconButton from "@/components/molecules/IconButton/IconButton";
import { getCategoryLabel } from "@/constants/categoryOptions";
import { useSearchContext } from "@/contexts/SearchContext";
import useRegionStore from "@/store/useRegionStore";

import { colors } from "@/styles/colors";

interface SearchFilterTabProps {
  openSheet: (
    sheetType: "sort" | "filter",
    initTab?: "foodType" | "region"
  ) => void;
}

export default function SearchFilterTab({ openSheet }: SearchFilterTabProps) {
  const { state } = useSearchContext();
  const { dong } = useRegionStore();

  return (
    <div className="sticky top-0 z-10 flex items-center gap-[8px] px-[16px] py-[12px] bg-surface-normal-bg01 border-b-[0.5px] border-border-normal-lowemp overflow-x-auto scrollbar-hide">
      <IconButton
        text="필터"
        startIcon={
          <Icon
            icon="Filter"
            size={20}
            stroke={
              state.filters.foodTypes || dong.length > 0
                ? colors.TextIcon.OnNormal.White
                : colors.TextIcon.OnNormal.MidEmp
            }
            fill={
              state.filters.foodTypes || dong.length > 0
                ? colors.TextIcon.OnNormal.HighestEmp
                : colors.TextIcon.OnNormal.White
            }
          />
        }
        gap={2}
        variant={
          state.filters.foodTypes || dong.length > 0
            ? "filterActive"
            : "filterDefault"
        }
        onClick={() => openSheet("filter", "foodType")}
        className="flex-shrink-0"
      />

      <Button
        variant={dong.length > 0 ? "filterOption" : "filterDefault"}
        onClick={() => openSheet("filter", "region")}
        className="flex-shrink-0"
      >
        {dong.length > 0 ? (
          <>
            {dong[0].name}
            {dong.length > 1 ? ` 외 ${dong.length - 1}개` : ""}
          </>
        ) : (
          "지역 설정"
        )}
      </Button>

      <Button
        variant={state.filters.foodTypes ? "filterOption" : "filterDefault"}
        onClick={() => openSheet("filter", "foodType")}
        className="flex-shrink-0"
      >
        {state.filters.foodTypes
          ? getCategoryLabel(state.filters.foodTypes)
          : "음식 종류"}
      </Button>
    </div>
  );
}
