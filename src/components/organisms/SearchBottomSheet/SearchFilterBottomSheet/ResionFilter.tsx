import Button from "@/components/atoms/Button/Button";
import SelectButtonGroup from "@/components/molecules/SelectButtonGroup/SelectButtonGroup";

export default function RegionFilter() {
  return (
    <div className="space-y-[12px]">
      <div className="flex items-center justify-between">
        <h2 className="body-m-semibold text-texticon-onnormal-highestemp">
          지역
        </h2>
        <Button
          variant="text"
          className="body-s-regular text-texticon-onnormal-midemp"
        >
          초기화
        </Button>
      </div>
      <div className="space-y-[24px]">
        {/* TODO : 재석님 지역 패칭 코드 참고해서 구현 예정. 아래는 임시 데이터 */}
        <SelectButtonGroup
          options={[
            { value: "서울", label: "서울" },
            { value: "경기", label: "경기" },
            { value: "인천", label: "인천" },
            { value: "강원", label: "강원" },
            { value: "대전", label: "대전" },
            { value: "대구", label: "대구" },
            { value: "부산", label: "부산" },
            { value: "울산", label: "울산" },
            { value: "세종", label: "세종" },
            { value: "광주", label: "광주" },
            { value: "전남", label: "전남" },
          ]}
          selectedValues={["서울"]}
          onToggle={() => {}}
          multiple={false}
          columns={4}
          description="광역시도"
          buttonVariant="filterSingle"
        />
        {/* <SelectButtonGroup
          options={["서울", "경기", "인천", "강원"]}
          selectedValues={["서울"]}
          onToggle={() => {}}
          columns={4}
          description="시군구"
          buttonVariant="filterSingle"
        />
        <SelectButtonGroup
          options={["서울", "경기", "인천", "강원"]}
          selectedValues={["서울"]}
          onToggle={() => {}}
          multiple={true}
          columns={3}
          description="동읍면 (복수 선택 가능)"
          buttonVariant="filterMulti"
          className="bg-brand-primary-surface px-[16px] py-[12px] rounded-[4px]"
        /> */}
      </div>
    </div>
  );
}
