"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { colors } from "@/styles/colors";
import Icon from "@/components/atoms/Icon/Icon";
import Button from "@/components/atoms/Button/Button";
import DefaultHeader from "@/components/molecules/Header/DefaultHeader";
import IconButton from "@/components/molecules/IconButton/IconButton";
import { ContextMenu } from "@/components/molecules/ContextMenu";
import { SavedGroupList } from "@/components/organisms/ActivityList";

import type { SavedGroupInfo } from "@/types/activity";

type SortType = "recent" | "name" | "group";

const SORT_LABELS: Record<SortType, string> = {
  recent: "최근 등록 순",
  name: "이름 순",
  group: "그룹 추가 순",
};

interface SavedPageTemplateProps {
  items: SavedGroupInfo[];
}

export default function SavedPageTemplate({ items }: SavedPageTemplateProps) {
  const router = useRouter();
  const [sortType, setSortType] = useState<SortType>("recent");

  /**
   * TODO: 정렬 기준에 따라 데이터 정렬 useEffect 로직 추가
   */

  return (
    <div className="flex flex-col flex-1 h-full w-full bg-surface-normal-container0">
      {/* 헤더 */}
      <div className="sticky top-0 z-10 bg-surface-normal-container0">
        <DefaultHeader
          title="저장한 가게"
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
                label: SORT_LABELS.name,
                onClick: () => setSortType("name"),
                selected: sortType === "name",
              },
              {
                label: SORT_LABELS.group,
                onClick: () => setSortType("group"),
                selected: sortType === "group",
              },
            ]}
          />
        </div>
      </div>

      {/* 저장 그룹 리스트 */}
      <SavedGroupList
        items={items}
        onItemClick={(item) => {
          router.push(`/saved/${item.group_id}`);
        }}
      />

      <div className="sticky bottom-0 z-10 flex justify-center items-center pb-[38px] pt-[14px] px-[16px] bg-surface-normal-container0">
        <Button
          variant="neutral"
          className="button-l-semibold py-[16px]"
          fullWidth
          onClick={() => {
            // TODO: 그룹 생성 바텀시트 추가 필요
          }}
        >
          새로운 그룹 만들기
        </Button>
      </div>
    </div>
  );
}
