import Icon from "@/components/atoms/Icon/Icon";
import IconButton from "@/components/molecules/IconButton/IconButton";

interface SearchListSortTabProps {
  totalCount?: number;
  openSortSheet: () => void;
}

export default function SearchListSortTab({
  totalCount = 0,
  openSortSheet,
}: SearchListSortTabProps) {
  return (
    <>
      <div className="flex justify-between items-center px-[16px] py-[12px] border-b-[0.5px] border-border-normal-lowemp">
        <span className="body-s-regular text-texticon-onnormal-midemp">
          {totalCount} 건
        </span>
        <IconButton
          className="body-s-regular text-texticon-onnormal-midemp"
          text={"관련순"}
          gap={0}
          endIcon={<Icon icon="Dropdown" size={20} strokeWidth={1} />}
          onClick={openSortSheet}
        />
      </div>
    </>
  );
}
