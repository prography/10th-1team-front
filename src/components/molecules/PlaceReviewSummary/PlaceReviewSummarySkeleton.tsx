import React from "react";

export default function PlaceReviewSummarySkeleton() {
  return (
    <div className="bg-surface-normal-container0 flex flex-col w-full gap-[24px] py-[24px] px-[16px] justify-center items-center animate-pulse">
      <div className="flex justify-between w-full">
        <div className="h-[18px] w-[60px] bg-gray-200 rounded" />
        <div className="h-[14px] w-[48px] bg-gray-200 rounded" />
      </div>
      <div className="flex flex-col justify-center items-center gap-[8px]">
        <div className="h-[24px] w-[120px] bg-gray-200 rounded mb-2" />
        <div className="h-[16px] w-[180px] bg-gray-200 rounded mb-2" />
        <div className="h-[14px] w-[80px] bg-gray-200 rounded" />
      </div>
      <div className="bg-surface-normal-container-b50 rounded-[8px] flex flex-col w-[216px] h-[76px] justify-center items-center gap-[8px] px-[48px] py-[14px]">
        <div className="flex justify-between w-full">
          <div className="h-[14px] w-[48px] bg-gray-200 rounded" />
          <div className="h-[14px] w-[32px] bg-gray-200 rounded" />
        </div>
        <div className="flex justify-between w-full">
          <div className="h-[14px] w-[48px] bg-gray-200 rounded" />
          <div className="h-[14px] w-[32px] bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}
