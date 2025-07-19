import Button from "@/components/atoms/Button/Button";
import SelectButtonGroup from "@/components/molecules/SelectButtonGroup/SelectButtonGroup";
import type { Province, DongInfo, City } from "@/types/region";
import { useEffect, useState } from "react";

interface RegionFilterProps {
  regions: Province[];
  selectedProvince: string;
  selectedCity: string;
  selectedDong: DongInfo[];
  onChange: (province: string, city: string, dongList: DongInfo[]) => void;
  getDongListByCity: (city: string) => DongInfo[];
  onReset?: () => void;
}

export default function RegionFilter({
  regions,
  selectedProvince: initialProvince,
  selectedCity: initialCity,
  selectedDong: initialDong,
  onChange,
  getDongListByCity,
  onReset,
}: RegionFilterProps) {
  const [province, setProvince] = useState(initialProvince);
  const [city, setCity] = useState(initialCity);
  const [dongList, setDongList] = useState<DongInfo[]>(initialDong);

  useEffect(() => {
    setProvince(initialProvince);
    setCity(initialCity);
    setDongList(initialDong);
  }, [initialProvince, initialCity, initialDong]);

  const handleProvinceSelect = (prov: string) => {
    setProvince(prov);
    setCity("");
    setDongList([]);
    onChange(prov, "", []);
  };

  const handleCitySelect = (ct: string) => {
    setCity(ct);
    setDongList([]);
    onChange(province, ct, []);
  };

  const handleDongToggle = (dong: DongInfo) => {
    let newDongList: DongInfo[];
    if (dongList.some((d) => d.name === dong.name)) {
      newDongList = dongList.filter((d) => d.name !== dong.name);
    } else {
      newDongList = [...dongList, dong];
    }
    setDongList(newDongList);
    onChange(province, city, newDongList);
  };

  const provinceOptions = regions.map((p) => ({
    value: p.name,
    label: p.name,
  }));
  const cityList: City[] =
    regions.find((p) => p.name === province)?.city_list ?? [];
  const cityOptions = cityList.map((c) => ({
    value: c.name,
    label: c.name,
    is_searchable: c.is_searchable,
  }));
  const dongOptions = city
    ? getDongListByCity(city).map((d) => ({
        value: d.name,
        label: d.name,
        dong_code: d.dong_code,
      }))
    : [];

  return (
    <div className="space-y-[12px]">
      <div className="flex items-center justify-between">
        <h2 className="body-m-semibold text-texticon-onnormal-highestemp">
          지역
        </h2>
        <Button
          variant="text"
          className="body-s-regular text-texticon-onnormal-midemp"
          onClick={onReset}
        >
          초기화
        </Button>
      </div>
      <div className="space-y-[24px]">
        <SelectButtonGroup
          options={provinceOptions}
          selectedValues={province ? [province] : []}
          onToggle={handleProvinceSelect}
          multiple={false}
          columns={4}
          description="광역시도"
          buttonVariant="filterSingle"
        />
        {province && (
          <SelectButtonGroup
            options={cityOptions}
            selectedValues={city ? [city] : []}
            onToggle={handleCitySelect}
            multiple={false}
            columns={4}
            description="시군구"
            buttonVariant="filterSingle"
            getOptionDisabled={(cityName) => {
              const cityObj = cityList.find((c) => c.name === cityName);
              return cityObj ? !cityObj.is_searchable : false;
            }}
          />
        )}
        {city && (
          <SelectButtonGroup
            options={dongOptions}
            selectedValues={dongList.map((d) => d.name)}
            onToggle={(dongName) => {
              const dong = dongOptions.find((d) => d.value === dongName);
              if (dong)
                handleDongToggle({
                  name: dong.value,
                  dong_code: dong.dong_code,
                });
            }}
            multiple={true}
            columns={3}
            description="동읍면 (복수 선택 가능)"
            buttonVariant="filterMulti"
            className="bg-brand-primary-surface px-[16px] py-[12px] rounded-[4px]"
          />
        )}
      </div>
    </div>
  );
}
