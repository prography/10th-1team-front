"use client";

import KakaoMap from "@/components/molecules/KaKaoMap/KakaoMap";
import Icon from "@/components/atoms/Icon/Icon";
import { useCallback, useMemo } from "react";
import { colors } from "@/styles/colors";

interface PlaceLocationProps {
  address: string;
  latitude: number;
  longitude: number;
}

const createSVGMarkerURL = (color: string = "#000000") => {
  const svgString = `
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 2C10.477 2 6 6.477 6 12C6 19.5 16 30 16 30C16 30 26 19.5 26 12C26 6.477 21.523 2 16 2ZM16 15C14.343 15 13 13.657 13 12C13 10.343 14.343 9 16 9C17.657 9 19 10.343 19 12C19 13.657 17.657 15 16 15Z" fill="${color}"/>
    </svg>
  `;
  
  const blob = new Blob([svgString], { type: 'image/svg+xml' });
  return URL.createObjectURL(blob);
};

export default function PlaceLocation({ address, latitude, longitude }: PlaceLocationProps) {
  const markerURL = useMemo(() => createSVGMarkerURL(colors.TextIcon.OnNormal["Main 500"]), []);

  return (
    <div className="flex flex-col gap-[12px] w-full px-[16px] py-[24px] bg-surface-normal-bg01">
      <h2 className="body-m-semibold text-texticon-onnormal-highemp ">위치</h2>
      <div className="self-stretch h-[180px] relative rounded-xl border border-border-normal-lowemp overflow-hidden">
        <KakaoMap 
          latitude={latitude} 
          longitude={longitude} 
          level={3}
          markerImage={markerURL}
          markerSize={{ width: 32, height: 32 }}
          markerPosition={{ x: 32, y: 32 }}
        />
      </div>
      <div className="self-stretch inline-flex justify-start items-center  gap-[4px]">
        <Icon icon="Location" size={20} />
        <p className="body-s-regular text-texticon-onnormal-highemp">{address}</p>
      </div>
    </div>
  );
}