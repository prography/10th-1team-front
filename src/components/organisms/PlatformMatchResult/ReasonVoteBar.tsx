import React from "react";
import { cn } from "@/utils/cn";
import Icon from "@/components/atoms/Icon/Icon";
import { colors } from "@/styles/colors";

interface ReasonVoteBarProps {
  label: string;
  count: number;
  total: number;
  maxCountSelected?: boolean;
  selected?: boolean;
}

export default function ReasonVoteBar({
  label,
  count,
  total,
  maxCountSelected = false,
  selected = false,
}: ReasonVoteBarProps) {
  const ratio = total > 0 ? Math.round((count / total) * 100) / 100 : 0;
  const countText = count > 99 ? "99+" : count;
  return (
    <div
      className={cn(
        "relative w-full flex items-center h-[44px] rounded-[8px] border overflow-hidden box-border transition",
        selected
          ? "border-border-primary-500"
          : "border-border-normal-lowemp bg-texticon-onnormal-white"
      )}
    >
      {/* 비율에 따라 채워지는 배경 */}
      <div
        className={cn(
          "absolute left-0 top-0 h-full transition-all",
          maxCountSelected
            ? "bg-brand-primary-main"
            : "bg-surface-normal-container-b10"
        )}
        style={{
          width: `calc(${ratio * 100}%)`, // border 두께 보정
          minWidth: 0,
          zIndex: 1,
          transition: "width 0.4s",
        }}
      />
      {/* 내용 */}
      <div className="relative flex-1 flex items-center px-[24px] z-10 min-w-0">
        {selected ? (
          <div className="mr-[12px]">
            <Icon
              icon="Check"
              size={24}
              stroke={
                maxCountSelected
                  ? colors.TextIcon.OnNormal.White
                  : colors.Brand.Primary.Main
              }
            />
          </div>
        ) : null}
        <span
          className={cn(
            "truncate body-s-semibold",
            maxCountSelected
              ? "text-texticon-onnormal-white"
              : "text-texticon-onnormal-lowemp"
          )}
        >
          {label}
        </span>
        <span
          className={cn(
            "ml-[12px] caption-s-regular",
            maxCountSelected
              ? "text-texticon-onnormal-white"
              : "text-texticon-onnormal-lowemp"
          )}
        >
          {countText}표
        </span>
      </div>
    </div>
  );
}
