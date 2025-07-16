"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { colors } from "@/styles/colors";
import Icon from "@/components/atoms/Icon/Icon";
import DefaultHeader from "@/components/molecules/Header/DefaultHeader";
import IconButton from "@/components/molecules/IconButton/IconButton";
import { ContextMenu } from "@/components/molecules/ContextMenu";
import { VotedActivityList } from "@/components/organisms/ActivityList";

import type { VotedActivityInfo } from "@/types/activity";

type SortType = "recent" | "old";

const SORT_LABELS: Record<SortType, string> = {
  recent: "최근 등록 순",
  old: "과거 등록 순",
};

interface VotedPageTemplateProps {
  items: VotedActivityInfo[];
}

export default function VotedPageTemplate({ items }: VotedPageTemplateProps) {
  const router = useRouter();
  const [sortType, setSortType] = useState<SortType>("recent");

  return (
    <div className="flex flex-col flex-1 h-full w-full bg-surface-normal-container0">
      {/* 헤더 */}
      <div className="sticky top-0 z-10 bg-surface-normal-container0">
        <DefaultHeader
          title="투표한 가게"
          startIcon={<Icon icon="Back" />}
          onClickStartIcon={() => router.back()}
          fullWidth
          className="border-b border-border-normal-lowemp"
        />

        {/* 정렬기준 서브 헤더 */}
        <div className="flex justify-between items-center px-[16px] pt-[24px] pb-[12px]">
          <div className="body-m-semibold text-texticon-onnormal-highestemp space-x-[8px]">
            <span>전체</span>
            <span className="text-texticon-onnormal-main-500">99</span>
          </div>
          <ContextMenu
            align="right"
            offset={{ x: 0, y: 8 }}
            trigger={(props) => (
              <IconButton
                {...props}
                gap={4}
                text={SORT_LABELS[sortType]}
                className="body-s-regular"
                endIcon={
                  <Icon
                    icon="Dropdown"
                    size={20}
                    fill={colors.TextIcon.OnNormal.LowestEmp}
                  />
                }
              />
            )}
            icon={<Icon icon="Check" size={20} />}
            items={[
              {
                label: SORT_LABELS.recent,
                onClick: () => setSortType("recent"),
                selected: sortType === "recent",
              },
              {
                label: SORT_LABELS.old,
                onClick: () => setSortType("old"),
                selected: sortType === "old",
              },
            ]}
          />
        </div>
      </div>

      {/* 저장 그룹 리스트 */}
      <VotedActivityList
        items={items}
        onItemClick={() => {
          // TODO: 장소 상세 페이지로 이동
        }}
      />
    </div>
  );
}
