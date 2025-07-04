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
  const { province, city, dong, setRegion } = useRegionStore();

  return (
    <div className="sticky top-0 z-10 h-[52px] flex items-center gap-[12px] px-[16px] py-[12px] bg-surface-normal-bg01 border-b-[0.5px] border-border-normal-lowemp overflow-x-auto scrollbar-hide">
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
        <span className="text-texticon-onnormal-highemp">
          {dong.length > 0 ? dong[0].name : "행정동"}
        </span>
        <span className="text-texticon-onnormal-main-500">
          {dong.length > 1 ? `외 ${dong.length - 1}` : ""}
        </span>
      </Button>

      {dong.map((d) => (
        <IconButton
          key={d.dong_code}
          endIcon={
            <Icon
              icon="TapDelete"
              size={16}
              stroke={colors.TextIcon.OnNormal.HighEmp}
            />
          }
          text={d.name}
          gap={4}
          variant="filterLocationLabel"
          className="flex-shrink-0"
          onClick={() => {
            setRegion(
              province,
              city,
              dong.filter((item) => item.dong_code !== d.dong_code)
            );
          }}
        />
      ))}
    </div>
  );
}
