"use client";
import React from "react";
import Button from "@/components/atoms/Button/Button";
import IconButton from "@/components/molecules/IconButton/IconButton";
import Icon from "@/components/atoms/Icon/Icon";
import { City, Province } from "@/types/region";
import { useRegionListPanel } from "@/components/organisms/RegionSelector/panels/RegionListPanel/useRegionListPanel";

interface RegionListPanelProps {
  regions: Province[];
  selectedProvince: string;
  selectedCity: string;
  onNext: (province: string, city: string) => void;
}

function RegionListPanel({
  regions,
  onNext,
  selectedProvince,
  selectedCity,
}: RegionListPanelProps) {
  const {
    selectedProvince: province,
    selectedCity: city,
    handleProvinceSelect,
    handleCitySelect,
    cityList,
  } = useRegionListPanel(regions, selectedProvince, selectedCity);

  return (
    <>
      <div className="flex-1 overflow-hidden flex">
        <div className="w-3/10 overflow-y-auto inline-flex flex-col">
          {regions.map((provinceObj: Province) => (
            <div
              key={provinceObj.name}
              className={`self-stretch min-h-[44px] py-2 inline-flex justify-center items-center gap-2.5 body-s-regular border-r border-border-normal-lowemp ${province === provinceObj.name ? "bg-brand-primary-surface text-brand-primary-main" : "hover:bg-gray-50"} text-center`}
              onClick={() => handleProvinceSelect(provinceObj.name)}
            >
              {provinceObj.name}
            </div>
          ))}
        </div>
        <div className="w-7/10 overflow-y-auto inline-flex flex-col justify-start items-start">
          {province &&
            cityList.map((cityObj: City) => (
              <div
                key={cityObj.name}
                className={`self-stretch min-h-[44px] pl-[20px] pr-[16px] py-[8px] inline-flex justify-between items-center body-s-regular ${
                  !cityObj.is_searchable
                    ? "bg-surface-normal-bg01 text-texticon-onnormal-lowemp"
                    : city === cityObj.name
                      ? "bg-surface-normal-container-b50 text-brand-primary-main"
                      : "hover:bg-gray-50"
                }`}
                onClick={() => {
                  if (!cityObj.is_searchable) return;
                  handleCitySelect(cityObj.name);
                }}
              >
                {cityObj.name}
                {city === cityObj.name && (
                  <IconButton endIcon={<Icon size={20} icon="Check" />} />
                )}
              </div>
            ))}
        </div>
      </div>
      <div className="flex gap-[8px] w-full px-[16px] py-[14px]">
        <Button
          className="flex-1 h-[56px]"
          variant="primary"
          onClick={() => onNext(province!, city!)}
          disabled={!city || city.length === 0}
        >
          다음
        </Button>
      </div>
    </>
  );
}

export default RegionListPanel;
