import Icon from "@/components/atoms/Icon/Icon";

export default function RecommendedStoresHeader() {
  return (
    <div className="flex flex-col items-center gap-[24px] mb-[80px]">
      <Icon icon="ServiceLogo" size={48} />
      <div className="flex flex-col items-center gap-[8px]">
        <span className="title-m-semibold text-texticon-onnormal-highestemp">
          저희가 추천하는 맛집이에요
        </span>
        <span className="body-s-regular text-texticon-onnormal-midemp">
          어디로 갈지 모를 때, 이곳은 어때요?
        </span>
      </div>
    </div>
  );
}
