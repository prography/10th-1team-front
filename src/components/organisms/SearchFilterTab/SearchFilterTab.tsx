import Button from "@/components/atoms/Button/Button";
import Icon from "@/components/atoms/Icon/Icon";
import IconButton from "@/components/molecules/IconButton/IconButton";
import { getCategoryLabel } from "@/constants/categoryOptions";
import { useSearchContext } from "@/contexts/SearchContext";

import { colors } from "@/styles/colors";

interface SearchFilterTabProps {
  openSheet: (
    sheetType: "sort" | "filter",
    initTab?: "foodType" | "region"
  ) => void;
}

export default function SearchFilterTab({ openSheet }: SearchFilterTabProps) {
  const { state } = useSearchContext();

  return (
    <div className="h-[52px] flex gap-[12px] items-center px-[16px] py-[12px] border-b-[0.5px] border-border-normal-lowemp overflow-x-auto scrollbar-hide">
      <IconButton
        text="필터"
        startIcon={<Icon icon="Filter" size={20} />}
        gap={2}
        variant="filter"
        onClick={() => openSheet("filter", "foodType")}
        className="flex-shrink-0"
      />
      {state.filters.foodTypes && (
        <Button
          variant="filterLabel"
          onClick={() => openSheet("filter", "foodType")}
          className="flex-shrink-0"
        >
          {getCategoryLabel(state.filters.foodTypes)}
        </Button>
      )}
      <Button
        variant="filterLocationLabel"
        onClick={() => openSheet("filter", "region")}
        className="flex-shrink-0"
      >
        <span className="text-texticon-onnormal-highemp">대치동 외</span>
        <span className="text-texticon-onnormal-main-500">99</span>
      </Button>

      {["대치동", "역삼동", "삼성동", "청담동", "논현동", "신사동"].map(
        (location) => (
          <IconButton
            key={location}
            endIcon={
              <Icon
                icon="TapDelete"
                size={16}
                stroke={colors.TextIcon.OnNormal.HighEmp}
              />
            }
            text={location}
            gap={4}
            variant="filterLocationLabel"
            className="flex-shrink-0"
            onClick={() => {
              /*TODO: 지역 필터 삭제 기능 구현 */
            }}
          />
        )
      )}
    </div>
  );
}
