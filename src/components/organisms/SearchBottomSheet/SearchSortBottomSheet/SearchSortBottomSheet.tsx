import { useState } from "react";
import { cn } from "@/utils/cn";
import { useSearchContext } from "@/contexts/SearchContext";
import BottomSheet from "@/components/molecules/BottomSheet/BottomSheet";
import Icon from "@/components/atoms/Icon/Icon";
import { SORT_OPTIONS } from "@/constants/sortOptions";
import type { SortType } from "@/types/search";

interface SearchSortBottomSheetProps {
  onClose: () => void;
}

export default function SearchSortBottomSheet({
  onClose,
}: SearchSortBottomSheetProps) {
  const { state, updateSort } = useSearchContext();
  const [selectedSort, setSelectedSort] = useState<SortType>(state.currentSort);

  const handleClose = () => {
    if (selectedSort !== state.currentSort) {
      updateSort(selectedSort);
    }
    onClose();
  };

  return (
    <BottomSheet onClose={handleClose} title="검색 정렬 설정">
      <div className="pb-[24px]">
        {SORT_OPTIONS.map((option) => (
          <div
            key={option.value}
            onClick={() => setSelectedSort(option.value)}
            className={cn(
              "flex items-center justify-between px-[16px] py-[20px] cursor-pointer hover:bg-gray-50 transition-colors",
              selectedSort === option.value && "bg-blue-50"
            )}
          >
            <div className="flex-1">
              <div
                className={cn(
                  selectedSort === option.value
                    ? "body-s-semibold text-texticon-onnormal-main-500"
                    : "body-s-regular text-texticon-onnormal-lowestemp"
                )}
              >
                {option.label}
              </div>
            </div>

            {selectedSort === option.value && (
              <Icon icon="Check" size={20} fill="primary" />
            )}
          </div>
        ))}
      </div>
    </BottomSheet>
  );
}
