"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { colors } from "@/styles/colors";
import Icon from "@/components/atoms/Icon/Icon";
import Divider from "@/components/atoms/Divider/Divider";
import Button from "@/components/atoms/Button/Button";
import DefaultHeader from "@/components/molecules/Header/DefaultHeader";
import IconButton from "@/components/molecules/IconButton/IconButton";
import { ContextMenu } from "@/components/molecules/ContextMenu";
import { SavedGroupDetailList } from "@/components/organisms/ActivityList";
import { sortByDate, sortByName } from "@/utils/sort";

import type { PlaceInfo } from "@/types/activity";

type SortType = "recent" | "name";

const SORT_LABELS: Record<SortType, string> = {
  recent: "최신 순",
  name: "장소명 순",
};

interface SavedGroupDetailTemplateProps {
  items: PlaceInfo[];
  groupName: string;
  total: number;
  groupIcon: string;
}

export default function SavedGroupDetailTemplate({
  items,
  groupName,
  total,
  groupIcon,
}: SavedGroupDetailTemplateProps) {
  const router = useRouter();
  const [sortType, setSortType] = useState<SortType>("recent");
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState<PlaceInfo[]>([]);

  const sortMethods: Record<SortType, (arr: PlaceInfo[]) => PlaceInfo[]> = {
    recent: (arr) => sortByDate(arr, (p) => p.saved_at, "desc"),
    name: (arr) => sortByName(arr, (p) => p.place_name),
  };

  const sortedItems = useMemo(() => {
    return sortMethods[sortType](items);
  }, [items, sortType]);

  const deleteEditMode = useCallback(() => {
    setIsEditMode(false);
    setSelectedItems([]);
  }, []);

  const toggleAllItemsSelection = useCallback(() => {
    setSelectedItems(
      selectedItems.length === items.length
        ? []
        : items.map((item) => ({ ...item, isSelected: true }))
    );
  }, [items, selectedItems]);

  const toggleItemSelection = useCallback((item: PlaceInfo) => {
    setSelectedItems((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i.place_id !== item.place_id)
        : [...prev, item]
    );
  }, []);

  return (
    <div className="flex flex-col flex-1 h-full w-full bg-surface-normal-container0">
      {/* 헤더 */}
      <div className="sticky top-0 z-10 bg-surface-normal-container0">
        <DefaultHeader
          title={isEditMode ? "편집하기" : "저장한 가게"}
          startIcon={!isEditMode && <Icon icon="Back" />}
          endIcon={isEditMode && <Icon icon="Exit" />}
          onClickStartIcon={() => router.back()}
          onClickEndIcon={deleteEditMode}
          fullWidth
          className="border-b border-border-normal-lowemp"
        />

        {isEditMode && (
          <div className="flex justify-between items-center px-[16px] py-[11px] border-b-[0.5px] border-border-normal-lowemp">
            <IconButton
              startIcon={
                <Icon
                  icon="Radio"
                  fill={
                    selectedItems.length === items.length
                      ? colors.TextIcon.OnNormal["Main 500"]
                      : undefined
                  }
                  stroke={
                    selectedItems.length === items.length
                      ? colors.TextIcon.OnNormal.White
                      : undefined
                  }
                />
              }
              text="전체 선택"
              className="body-s-regular text-texticon-onnormal-midemp"
              gap={16}
              onClick={toggleAllItemsSelection}
            />
          </div>
        )}

        {!isEditMode && (
          <>
            {/* 그룹 정보 */}
            <div className="flex flex-col px-[16px] py-[24px]">
              <Icon icon="Group" fill={groupIcon} />
              <p className="body-l-semibold text-texticon-onnormal-highestemp mt-[12px] mb-[8px]">
                {groupName}
              </p>
              <p className="body-s-regular space-x-[4px] text-texticon-onnormal-lowemp">
                <span>저장된 가게</span>
                <span className="body-s-semibold">{total}</span>
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
                  setIsEditMode(true);
                }}
              >
                편집하기
              </Button>
            </div>
          </>
        )}
      </div>

      {/* 저장 장소 리스트 */}
      <div className="flex flex-col flex-1 px-[16px]">
        <SavedGroupDetailList
          items={sortedItems}
          selectedItems={selectedItems}
          isEditMode={isEditMode}
          onItemClick={(item) => {
            if (isEditMode) {
              toggleItemSelection(item);
            } else {
              router.push(`/place/${item.place_id}`);
            }
          }}
        />
      </div>

      {isEditMode && (
        <div className="sticky bottom-0 z-10 flex justify-center items-center gap-[10px] pb-[38px] pt-[14px] px-[16px] bg-surface-normal-container0">
          <Button
            variant="primary"
            className="button-l-semibold py-[16px]"
            fullWidth
            disabled={selectedItems.length === 0}
            onClick={() => {
              // TODO: 이동 바텀시트 추가 필요
            }}
          >
            이동
          </Button>
          <Button
            variant="primary"
            className="button-l-semibold py-[16px]"
            fullWidth
            disabled={selectedItems.length === 0}
            onClick={() => {
              // TODO: 삭제 모달
            }}
          >
            삭제
          </Button>
        </div>
      )}
    </div>
  );
}
