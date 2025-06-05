import Icon from "@/components/atoms/Icon/Icon";
import IconButton from "@/components/molecules/IconButton/IconButton";

interface SearchFilterTabProps {
  onOpenFilterModal: () => void;
}

export default function SearchFilterTab({
  onOpenFilterModal,
}: SearchFilterTabProps) {
  return (
    <div className="flex gap-2 items-center flex-wrap px-[16px] py-[12px] border-b-[0.5px] border-border-normal-lowemp">
      <IconButton
        text="필터"
        startIcon={<Icon icon="Filter" size={20} />}
        gap={2}
        variant="filter"
        onClick={onOpenFilterModal}
      />
    </div>
  );
}
