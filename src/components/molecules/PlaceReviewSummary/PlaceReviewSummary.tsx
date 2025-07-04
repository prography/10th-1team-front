import React from "react";

interface PlaceReviewSummaryProps {
  name: string;
  roadAddress: string;
  totalCount: number;
  kakaoCount: number;
  naverCount: number;
  date: string;
}

export default function PlaceReviewSummary({
  name,
  roadAddress,
  totalCount,
  kakaoCount,
  naverCount,
  date,
}: PlaceReviewSummaryProps) {
  return (
    <div className="bg-surface-normal-container0 flex flex-col w-full gap-[24px] py-[24px] px-[16px] justify-center items-center">
      <div className="flex justify-between w-full">
        <span className="body-m-semibold text-texticon-onnormal-highestemp">
          리뷰현황
        </span>
        <span className="caption-s-regular text-texticon-onnormal-lowestemp">
          {date}
        </span>
      </div>
      <div className="flex flex-col justify-center items-center">
        <span className="title-m-semibold text-texticon-onnormal-highestemp">
          {name}
        </span>
        <span className="body-s-regular text-texticon-onnormal-midemp">
          {roadAddress}
        </span>
        <span className="caption-m-semibold text-texticon-onnormal-main-500 mt-[11px]">
          전체 리뷰 수 {totalCount >= 999 ? "999+" : totalCount}
        </span>
      </div>
      <div className="bg-surface-normal-container-b50 rounded-[8px] flex flex-col w-[216px] h-[76px] justify-center items-center gap-[8px] px-[48px] py-[14px]">
        <div className="flex justify-between w-full">
          <span className="body-s-semibold text-texticon-onnormal-lowemp">
            카카오맵
          </span>
          <span className="body-s-semibold text-texticon-onnormal-highemp">
            {kakaoCount}
          </span>
        </div>
        <div className="flex justify-between w-full">
          <span className="body-s-semibold text-texticon-onnormal-lowemp">
            네이버지도
          </span>
          <span className="body-s-semibold text-texticon-onnormal-highemp">
            {naverCount}
          </span>
        </div>
      </div>
    </div>
  );
}
