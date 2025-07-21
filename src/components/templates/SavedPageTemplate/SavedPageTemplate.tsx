"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { usePortal } from "@/hooks/usePortal";
import { colors } from "@/styles/colors";
import Icon from "@/components/atoms/Icon/Icon";
import Button from "@/components/atoms/Button/Button";
import DefaultHeader from "@/components/molecules/Header/DefaultHeader";
import IconButton from "@/components/molecules/IconButton/IconButton";
import { AlertModal } from "@/components/molecules/Modal";
import { ContextMenu } from "@/components/molecules/ContextMenu";
import { SavedGroupList } from "@/components/organisms/ActivityList";
import { GroupWithInputBottomSheet } from "@/components/organisms/GroupBottomSheet";
import { sortByDate, sortByName } from "@/utils/sort";
import { useMemo } from "react";

import type { GroupInfo } from "@/types/activity";

type SortType = "recent" | "name" | "group";

const SORT_LABELS: Record<SortType, string> = {
  recent: "최근 등록 순",
  name: "이름 순",
  group: "그룹 추가 순",
};

interface SavedPageTemplateProps {
  total: number;
  groups: GroupInfo[];
  onDeleteClick?: (group_id: string) => void;
  onEdit?: (item: GroupInfo) => void;
}

export default function SavedPageTemplate({
  total,
  groups,
  onDeleteClick,
  onEdit,
}: SavedPageTemplateProps) {
  const createPortal = usePortal();
  const router = useRouter();
  const [sortType, setSortType] = useState<SortType>("recent");
  const [currentSheet, setCurrentSheet] = useState<
    "delete" | "edit" | "create" | null
  >(null);
  const [selectedItem, setSelectedItem] = useState<GroupInfo | null>(null);
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const sortMethods: Record<SortType, (arr: GroupInfo[]) => GroupInfo[]> = {
    recent: (arr) => sortByDate(arr, (g) => g.create_at, "desc"),
    name: (arr) => sortByName(arr, (g) => g.group_name),
    group: (arr) => sortByDate(arr, (g) => g.create_at),
  };

  const sortedGroups = useMemo(() => {
    return sortMethods[sortType](groups);
  }, [groups, sortType]);

  const openSheet = useCallback((sheetType: "delete" | "edit" | "create") => {
    setCurrentSheet(sheetType);
  }, []);

  const closeSheet = useCallback(() => {
    setGroupName("");
    setSelectedColor("");
    setCurrentSheet(null);
  }, []);

  const handleGroupNameChange = useCallback((value: string) => {
    setGroupName(value);
  }, []);

  const handleColorSelect = useCallback((color: string) => {
    setSelectedColor(color);
  }, []);

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
            <span className="text-texticon-onnormal-main-500">{total}</span>
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
      <div className="flex-1">
        <SavedGroupList
          items={sortedGroups}
          onItemClick={(item) => {
            router.push(`/saved/${item.group_id}`);
          }}
          onDeleteClick={(item) => {
            setSelectedItem(item);
            openSheet("delete");
          }}
          onEdit={(item) => {
            setSelectedItem(item);
            setGroupName(item.group_name);
            setSelectedColor(item.icon);
            openSheet("edit");
          }}
        />
      </div>

      {/* 새로운 그룹 만들기 버튼 */}
      <div className="sticky bottom-0 z-10 flex justify-center items-center pb-[38px] pt-[14px] px-[16px] bg-surface-normal-container0">
        <Button
          variant="neutral"
          className="button-l-semibold py-[16px]"
          fullWidth
          onClick={() => {
            openSheet("create");
          }}
        >
          새로운 그룹 만들기
        </Button>
      </div>

      {/* 관련 모달 및 바텀시트 */}
      {currentSheet === "delete" &&
        createPortal(
          <AlertModal
            isOpen={currentSheet === "delete"}
            onClose={closeSheet}
            title="삭제할까요?"
            description={`그룹을 삭제하면 \n 저장된 가게 정보도 함께 삭제돼요`}
            leftButtonText="취소"
            rightButtonText="삭제"
            onLeftButtonClick={closeSheet}
            onRightButtonClick={() => {
              if (selectedItem) onDeleteClick?.(selectedItem.group_id);
            }}
          />
        )}

      {currentSheet === "edit" &&
        createPortal(
          <GroupWithInputBottomSheet
            title="그룹 수정"
            groupName={groupName}
            selectedColor={selectedColor}
            onGroupNameChange={handleGroupNameChange}
            onColorSelect={handleColorSelect}
            onClose={closeSheet}
            onDone={() => {
              closeSheet();
              if (selectedItem) onEdit?.(selectedItem);
            }}
          />
        )}

      {currentSheet === "create" &&
        createPortal(
          <GroupWithInputBottomSheet
            title="새로운 그룹 만들기"
            groupName={groupName}
            selectedColor={selectedColor}
            onGroupNameChange={handleGroupNameChange}
            onColorSelect={handleColorSelect}
            onClose={closeSheet}
            onDone={() => {
              closeSheet();
              // TODO: 그룹 생성 로직 추가 필요
            }}
          />
        )}
    </div>
  );
}
