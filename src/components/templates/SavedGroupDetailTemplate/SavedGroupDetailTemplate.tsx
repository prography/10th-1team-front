"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { usePortal } from "@/hooks/usePortal";
import { colors } from "@/styles/colors";
import Icon from "@/components/atoms/Icon/Icon";
import Divider from "@/components/atoms/Divider/Divider";
import Button from "@/components/atoms/Button/Button";
import DefaultHeader from "@/components/molecules/Header/DefaultHeader";
import IconButton from "@/components/molecules/IconButton/IconButton";
import { ContextMenu } from "@/components/molecules/ContextMenu";
import { AlertModal } from "@/components/molecules/Modal";
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
  onDeleteClick: (items: string[]) => void;
  onMoveClick: (items: string[]) => void;
}

export default function SavedGroupDetailTemplate({
  items,
  groupName,
  total,
  groupIcon,
  onDeleteClick,
  onMoveClick,
}: SavedGroupDetailTemplateProps) {
  const createPortal = usePortal();
  const router = useRouter();

  const [sortType, setSortType] = useState<SortType>("recent");
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [currentSheet, setCurrentSheet] = useState<"move" | "delete" | null>(
    null
  );

  const sortMethods: Record<SortType, (arr: PlaceInfo[]) => PlaceInfo[]> = {
    recent: (arr) => sortByDate(arr, (p) => p.saved_at, "desc"),
    name: (arr) => sortByName(arr, (p) => p.place_name),
  };

  const sortedItems = useMemo(() => {
    return sortMethods[sortType](items);
  }, [items, sortType]);

  const openSheet = useCallback((sheetType: "move" | "delete") => {
    setCurrentSheet(sheetType);
  }, []);

  const closeSheet = useCallback(() => {
    setCurrentSheet(null);
  }, []);

  const deleteEditMode = useCallback(() => {
    setSelectedItems([]);
    setIsEditMode(false);
  }, []);

  const toggleAllItemsSelection = useCallback(() => {
    setSelectedItems(
      selectedItems.length === items.length
        ? []
        : items.map((item) => item.place_id)
    );
  }, [items, selectedItems]);

  const toggleItemSelection = useCallback((item: string) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
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

        {/* 편집 모드 상단 전체선택 버튼 */}
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

        {/* 편집 모드 아닐 때의 상단 렌더링 */}
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
                  setSelectedItems([]);
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
      <div className="flex flex-col flex-1">
        <SavedGroupDetailList
          items={sortedItems}
          selectedItems={selectedItems}
          isEditMode={isEditMode}
          onItemClick={(item) => {
            if (isEditMode) {
              toggleItemSelection(item.place_id);
            } else {
              router.push(`/place/${item.place_id}`);
            }
          }}
          onDeleteClick={(item) => {
            toggleItemSelection(item.place_id);
            openSheet("delete");
          }}
        />
      </div>

      {/* 편집 모드 하단 버튼 */}
      {isEditMode && (
        <div className="sticky bottom-0 z-10 flex justify-center items-center gap-[10px] pb-[38px] pt-[14px] px-[16px] bg-surface-normal-container0">
          <Button
            variant="primary"
            className="button-l-semibold py-[16px]"
            fullWidth
            disabled={selectedItems.length === 0}
            onClick={() => {
              onMoveClick(selectedItems);
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
              openSheet("delete");
            }}
          >
            삭제
          </Button>
        </div>
      )}

      {/* 관련 모달 */}
      {currentSheet === "delete" &&
        createPortal(
          <AlertModal
            isOpen={currentSheet === "delete"}
            onClose={closeSheet}
            title="선택한 가게를 삭제할까요?"
            leftButtonText="취소"
            rightButtonText="삭제"
            onLeftButtonClick={closeSheet}
            onRightButtonClick={() => {
              onDeleteClick(selectedItems);
            }}
          />
        )}
    </div>
  );
}
