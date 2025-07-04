import React from "react";

export default function ReviewCardSkeleton() {
  return (
    <div className="p-[16px] min-h-[148px] w-[280px] rounded-lg flex flex-col gap-[12px] relative bg-surface-normal-bg10 animate-pulse">
      <div className="flex flex-col gap-[8px]">
        <div className="h-[16px] w-[60px] bg-gray-200 rounded mb-2" />
        <div className="flex items-end gap-[8px]">
          <div className="flex gap-[2px]">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-4 h-4 bg-gray-200 rounded-full" />
            ))}
          </div>
          <div className="h-[12px] w-[48px] bg-gray-200 rounded" />
        </div>
      </div>
      <div className="mt-2">
        <div className="h-[16px] w-full bg-gray-200 rounded mb-1" />
        <div className="h-[16px] w-3/4 bg-gray-200 rounded mb-1" />
        <div className="h-[16px] w-2/3 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
