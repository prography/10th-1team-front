import { FilterOption, SortType } from "@/types/search";

export const SORT_OPTIONS: FilterOption<SortType>[] = [
  {
    value: "RELATED",
    label: "관련순",
  },
  {
    value: "AVERAGE_RATING_HIGH",
    label: "별점 높은순",
  },
  {
    value: "AVERAGE_RATING_LOW",
    label: "별점 낮은순",
  },
  {
    value: "REVIEW_COUNT_HIGH",
    label: "리뷰 많은순",
  },
  {
    value: "REVIEW_COUNT_LOW",
    label: "리뷰 적은순",
  },
];

export const getSortLabel = (sortType: SortType): string => {
  const option = SORT_OPTIONS.find((opt) => opt.value === sortType);
  return option?.label || "관련순";
};
