import Button from "@/components/atoms/Button/Button";
import { SearchRecentItem } from "@/types/search";

interface SearchHistoryHeaderProps {
  onClearHistory: () => void;
  items: SearchRecentItem[];
}

export default function SearchHistoryHeader({
  onClearHistory,
  items,
}: SearchHistoryHeaderProps) {
  return (
    <div className="flex justify-between items-center px-[16px] py-[18px]">
      <span className="body-m-semibold">최근 검색</span>
      {items.length > 0 && (
        <Button
          className="body-s-regular text-texticon-onnormal-lowemp"
          onClick={onClearHistory}
        >
          전체 삭제
        </Button>
      )}
    </div>
  );
}
