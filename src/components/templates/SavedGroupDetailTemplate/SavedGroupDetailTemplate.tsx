"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { colors } from "@/styles/colors";
import Icon from "@/components/atoms/Icon/Icon";
import Divider from "@/components/atoms/Divider/Divider";
import DefaultHeader from "@/components/molecules/Header/DefaultHeader";
import IconButton from "@/components/molecules/IconButton/IconButton";
import { ContextMenu } from "@/components/molecules/ContextMenu";
import { SavedGroupDetailList } from "@/components/organisms/ActivityList";

import type { SavedPlacesInfo } from "@/types/activity";
import Button from "@/components/atoms/Button/Button";

type SortType = "recent" | "name";

const SORT_LABELS: Record<SortType, string> = {
  recent: "최신 순",
  name: "장소명 순",
};

interface SavedGroupDetailTemplateProps {
  items: SavedPlacesInfo[];
  groupName: string;
  numberOfBookmark: number;
}

export default function SavedGroupDetailTemplate({
  items,
  groupName,
  numberOfBookmark,
}: SavedGroupDetailTemplateProps) {
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
        {/* 그룹 정보 */}
        <div className="flex flex-col px-[16px] py-[24px]">
          <Icon icon="Group" />
          <p className="body-l-semibold text-texticon-onnormal-highestemp mt-[12px] mb-[8px]">
            {groupName}
          </p>
          <p className="body-s-regular space-x-[4px] text-texticon-onnormal-lowemp">
            <span>저장된 가게</span>
            <span className="body-s-semibold">{numberOfBookmark}</span>
          </p>
        </div>
        <Divider />
        {/* 정렬기준 서브 헤더 */}
        <div className="flex justify-between items-center px-[16px] py-[12px] border-b-[0.5px] border-border-normal-lowemp">
          <ContextMenu
            align="left"
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
            ]}
          />
          <Button
            variant="neutral"
            className="button-s-medium py-[5px] px-[8px]"
            onClick={() => {
              // TODO: 그룹 편집 컴포넌트 추가 필요
            }}
          >
            편집하기
          </Button>
        </div>
      </div>

      {/* 저장 장소 리스트 */}
      <SavedGroupDetailList
        items={items}
        onItemClick={() => {
          // TODO: 장소 상세 페이지로 이동
        }}
      />
    </div>
  );
}
