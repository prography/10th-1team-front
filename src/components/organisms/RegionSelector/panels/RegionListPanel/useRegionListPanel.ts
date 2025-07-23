import { useState } from "react";
import type { Province } from "@/types/region";

export function useRegionListPanel(
  regions: Province[],
  initialProvince: string,
  initialCity: string
) {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(
    initialProvince
  );
  const [selectedCity, setSelectedCity] = useState<string | null>(initialCity);

  const handleProvinceSelect = (province: string) => {
    if (province === selectedProvince) return;
    setSelectedProvince(province);
    setSelectedCity(null);
  };

  const handleCitySelect = (city: string) => {
    if (!selectedProvince) return;
    setSelectedCity(city);
  };

  // 현재 선택된 시/도에 해당하는 시/구 리스트
  const cityList = (
    regions.find((province) => province.name === selectedProvince)?.city_list ||
    []
  ).sort((a, b) => {
    // is_searchable가 true인 항목을 먼저 정렬
    if (a.is_searchable && !b.is_searchable) return -1;
    if (!a.is_searchable && b.is_searchable) return 1;

    // is_searchable가 같은 경우 가나다순 정렬
    if (a.is_searchable === b.is_searchable) {
      return a.name.localeCompare(b.name);
    }

    return 0;
  });

  return {
    selectedProvince,
    setSelectedProvince,
    selectedCity,
    setSelectedCity,
    handleProvinceSelect,
    handleCitySelect,
    cityList,
  };
}
