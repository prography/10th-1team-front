import Icon from "@/components/atoms/Icon/Icon";
import React from "react";

interface WinningStatusProps {
  winningPlatform: "DROW" | "KAKAO" | "NAVER";
}

export default function WinningStatus({ winningPlatform }: WinningStatusProps) {
  return (
    <div className="bg-surface-normal-container-b10 text-texticon-onnormal-highestemp flex justify-center items-center body-s-regular mb-[24px] px-[8px] py-[4px] rounded-[4px]">
      {winningPlatform === "DROW" ? (
        <>
          <span className="text-brand-naver-main underline">네이버 지도</span>
          {"와 "}
          <span className="text-brand-kakao-main underline">카카오맵</span> 접전
          <div className="ml-5px">
            <Icon icon="BrandNaver" size={20} />
          </div>
        </>
      ) : winningPlatform === "KAKAO" ? (
        <>
          <span className="text-brand-kakao-main underline">카카오맵</span> 이
          우세
          <div className="ml-5px">
            <Icon icon="BrandKaKao" size={20} />
          </div>
        </>
      ) : (
        <>
          <span className="text-brand-naver-main underline">네이버 지도</span>가
          우세
          <div className="ml-5px">
            <Icon icon="BrandNaver" size={20} />
          </div>
        </>
      )}
    </div>
  );
}
