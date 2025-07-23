import Button from "@/components/atoms/Button/Button";
import Icon from "@/components/atoms/Icon/Icon";
import { DongInfo } from "@/types/region";

interface Props {
  selectedDong: DongInfo[];
  onClick: () => void;
  isDongAllSelected: boolean;
  selectedCity: string;
}

export default function LocationSelectorSection({
  selectedDong,
  onClick,
  isDongAllSelected,
  selectedCity,
}: Props) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-[4px]">
        <Icon icon="Location" size={24} />
        <span className="body-s-regular text-texticon-onnormal-midemp">
          {selectedDong[0] ? (
            <>
              {isDongAllSelected && selectedCity
                ? `${selectedCity}`
                : selectedDong[0].name}
              <span className="body-s-semibold text-texticon-onnormal-highestemp">
                {selectedDong.length > 1 &&
                  !isDongAllSelected &&
                  ` 외 ${selectedDong.length - 1}`}
              </span>
            </>
          ) : (
            "지역을 설정해주세요"
          )}
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
