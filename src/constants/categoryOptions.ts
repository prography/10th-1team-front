import type { CategoryType, FilterOption } from "@/types/search";

export const CATEGORY_OPTIONS: FilterOption<CategoryType>[] = [
  {
    value: "FD01",
    label: "한식",
  },
  {
    value: "FD02",
    label: "일식",
  },
  {
    value: "FD03",
    label: "중식",
  },
  {
    value: "FD04",
    label: "양식",
  },
  {
    value: "FD05",
    label: "분식",
  },
  {
    value: "FD06",
    label: "카페 & 베이커리",
  },
  {
    value: "FD07",
    label: "패스트푸드",
  },
  {
    value: "FD08",
    label: "샐러드",
  },
  {
    value: "FD09",
    label: "육류",
  },
  {
    value: "FD10",
    label: "해물",
  },
  {
    value: "FD11",
    label: "주점",
  },
  {
    value: "FD12",
    label: "기타 세계음식",
  },
];

export const getCategoryLabel = (categoryType: CategoryType): string => {
  const option = CATEGORY_OPTIONS.find((opt) => opt.value === categoryType);
  return option?.label || "정의되어 있지 않은 유형";
};
