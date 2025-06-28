import Button from "@/components/atoms/Button/Button";
import Icon from "@/components/atoms/Icon/Icon";

export default function ExploreSection() {
  return (
    <div className="flex justify-around py-[24px] px-[16px]">
      <Button className="flex-1 flex flex-col items-center gap-[4px]">
        <Icon icon="MainExplore" size={48} />
        <span className="body-s-semibold text-texticon-onnormal-highestemp">
          둘러보기
        </span>
        <span className="caption-s-regular text-texticon-onnormal-lowemp">
          추천 맛집 탐색
        </span>
      </Button>
      <Button className="flex-1 flex flex-col items-center gap-[4px]">
        <Icon icon="MainRulet" size={48} />
        <span className="body-s-semibold text-texticon-onnormal-highestemp">
          룰렛
        </span>
        <span className="caption-s-regular text-texticon-onnormal-lowemp">
          맛집 정하기
        </span>
      </Button>
      <Button className="flex-1 flex flex-col items-center gap-[4px]">
        <Icon icon="MainCalandar" size={48} />
        <span className="body-s-semibold text-texticon-onnormal-highestemp">
          캘린더
        </span>
        <span className="caption-s-regular text-texticon-onnormal-lowemp">
          맛집 기록
        </span>
      </Button>
    </div>
  );
}
