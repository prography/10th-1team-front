import Button from "@/components/atoms/Button/Button";
import SelectButtonGroup from "@/components/molecules/SelectButtonGroup/SelectButtonGroup";
import { CATEGORY_OPTIONS } from "@/constants/categoryOptions";
import { CategoryType } from "@/types/search";

interface FoodTypeFilterProps {
  selectedCategory: CategoryType | undefined;
  setSelectedCategory: (category: CategoryType | undefined) => void;
}

export default function FoodTypeFilter({
  selectedCategory,
  setSelectedCategory,
}: FoodTypeFilterProps) {
  const handleToggle = (value: CategoryType) => {
    if (value === selectedCategory) {
      setSelectedCategory(undefined);
    } else {
      setSelectedCategory(value);
    }
  };

  const handleReset = () => {
    setSelectedCategory(undefined);
  };

  return (
    <div className="space-y-[12px]">
      <div className="flex items-center justify-between">
        <h2 className="body-m-semibold text-texticon-onnormal-highestemp">
          음식 종류
        </h2>
        <Button
          variant="text"
          className="body-s-regular text-texticon-onnormal-midemp"
          onClick={handleReset}
        >
          초기화
        </Button>
      </div>
      <SelectButtonGroup
        options={CATEGORY_OPTIONS}
        selectedValues={selectedCategory ? [selectedCategory] : undefined}
        multiple={false}
        onToggle={handleToggle}
        buttonVariant="filterSingle"
      />
    </div>
  );
}
