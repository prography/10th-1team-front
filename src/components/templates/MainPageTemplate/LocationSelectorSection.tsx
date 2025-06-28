import Button from "@/components/atoms/Button/Button";
import Icon from "@/components/atoms/Icon/Icon";
import { DongInfo } from "@/types/region";

interface Props {
  selectedDong: DongInfo[];
  onClick: () => void;
}

export default function LocationSelectorSection({
  selectedDong,
  onClick,
}: Props) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-[4px]">
        <Icon icon="Location" size={24} />
        <span className="caption-m-regular text-texticon-onnormal-midemp">
          {selectedDong[0]?.name}
          {selectedDong.length > 1 && "외"}
          <span className="text-texticon-onnormal-highestemp">
            {selectedDong.length > 1 && `${selectedDong.length - 1}개`}
          </span>
        </span>
      </div>
      <Button
        variant="neutral"
        className="button-s-medium px-[8px] py-[5px]"
        onClick={onClick}
      >
        지역 설정
      </Button>
    </div>
  );
}
