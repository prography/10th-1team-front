import Button from "@/components/atoms/Button/Button";

interface SearchHistoryHeaderProps {
  onClearHistory: () => void;
}

export default function SearchHistoryHeader({
  onClearHistory,
}: SearchHistoryHeaderProps) {
  return (
    <div className="flex justify-between items-center px-[16px] py-[18px]">
      <span className="body-m-semibold">최근 검색</span>
      <Button
        className="body-s-regular text-texticon-onnormal-lowemp"
        onClick={onClearHistory}
      >
        전체 삭제
      </Button>
    </div>
  );
}
