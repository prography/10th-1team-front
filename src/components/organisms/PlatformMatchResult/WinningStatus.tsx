import React from "react";

interface WinningStatusProps {
  winningPlatform: "DROW" | "KAKAO" | "NAVER";
}

export default function WinningStatus({ winningPlatform }: WinningStatusProps) {
  return (
    <div className="bg-surface-normal-container0 border border-border-normal-lowemp text-texticon-onnormal-highestemp flex justify-center items-center body-s-regular mb-[24px] px-[8px] py-[4px] rounded-[4px]">
      {winningPlatform === "DROW" ? (
        <>
          <div>
            <span className="text-brand-naver-main body-s-semibold">
              네이버 지도
            </span>
            {"와 "}
            <span className="text-brand-kakao-blue body-s-semibold">
              카카오 맵
            </span>{" "}
            접전
          </div>
        </>
      ) : winningPlatform === "KAKAO" ? (
        <>
          <div>
            <span className="text-brand-kakao-blue body-s-semibold">
              카카오맵
            </span>{" "}
            이 우세
          </div>
        </>
      ) : (
        <>
          <div>
            <span className="text-brand-naver-main body-s-semibold">
              네이버 지도
            </span>{" "}
            가 우세
          </div>
        </>
      )}
    </div>
  );
}
