"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState, useMemo } from "react";
import { usePortal } from "@/hooks/usePortal";
import { colors } from "@/styles/colors";
import Icon from "@/components/atoms/Icon/Icon";
import Button from "@/components/atoms/Button/Button";
import Toast from "@/components/atoms/Toast/Toast";
import DefaultHeader from "@/components/molecules/Header/DefaultHeader";
import IconButton from "@/components/molecules/IconButton/IconButton";
import ConfirmModal from "@/components/molecules/ConfirmModal/ConfirmModal";
import { ContextMenu } from "@/components/molecules/ContextMenu";
import { SavedGroupList } from "@/components/organisms/ActivityList";
import {
  GroupWithInputBottomSheet,
  useGroupWithInputBottomSheet,
} from "@/components/organisms/GroupBottomSheet";
import { sortByDate, sortByName } from "@/utils/sort";

import type { GroupInfo } from "@/types/activity";
import {
  useBookmarkedGroupsQuery,
  useCreateGroupMutation,
  useDeleteGroupMutation,
  useUpdateGroupMutation,
} from "@/hooks/queries";
import { useSort, useSheetState } from "@/hooks";

type SortType = "recent" | "name" | "group";

const SORT_LABELS: Record<SortType, string> = {
  recent: "최근 등록 순",
  name: "이름 순",
  group: "그룹 추가 순",
};

const sorters = {
  recent: (arr: GroupInfo[]) => sortByDate(arr, (g) => g.create_at, "desc"),
  name: (arr: GroupInfo[]) => sortByName(arr, (g) => g.group_name),
  group: (arr: GroupInfo[]) => sortByDate(arr, (g) => g.create_at),
} as const;

export default function SavedPageTemplate() {
  const createPortal = usePortal();
  const router = useRouter();

  const { data, isLoading } = useBookmarkedGroupsQuery({
    queryKey: ["bookmarkedGroups"],
  });
  const createGroupMutation = useCreateGroupMutation();
  const deleteGroupMutation = useDeleteGroupMutation();
  const updateGroupMutation = useUpdateGroupMutation();

  const groups = useMemo(() => data?.groups ?? [], [data]);
  const total = useMemo(() => data?.total ?? 0, [data]);

  const { sortKey, setSortKey, sortedItems } = useSort<GroupInfo, SortType>(
    groups,
    sorters,
    "recent"
  );

  const { sheet, open, close } = useSheetState<"delete" | "edit" | "create">();
  const [selectedItem, setSelectedItem] = useState<GroupInfo | null>(null);
  const {
    groupName,
    setGroupName,
    selectedIcon,
    setSelectedIcon,
    resetGroupInput,
  } = useGroupWithInputBottomSheet();

  const [toast, setToast] = useState<{ open: boolean; message: string }>({
    open: false,
    message: "",
  });

  const closeSheet = useCallback(() => {
    resetGroupInput();
    close();
  }, [close, resetGroupInput]);

  const showToast = useCallback((message: string) => {
    setToast({ open: true, message });
  }, []);

  return (
    <div className="flex flex-col flex-1 h-full w-full bg-surface-normal-container0">
      {/* 헤더 */}
      <div className="sticky top-0 z-10 bg-surface-normal-container0">
        <DefaultHeader
          title="저장한 가게"
          startIcon={<Icon icon="Back" />}
          onClickStartIcon={() => router.push("/?sidebar=true")}
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
                text={SORT_LABELS[sortKey]}
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
                onClick: () => setSortKey("recent"),
                selected: sortKey === "recent",
              },
              {
                label: SORT_LABELS.name,
                onClick: () => setSortKey("name"),
                selected: sortKey === "name",
              },
              {
                label: SORT_LABELS.group,
                onClick: () => setSortKey("group"),
                selected: sortKey === "group",
              },
            ]}
          />
        </div>
      </div>

      {/* 저장 그룹 리스트 */}
      <div className="flex-1">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            로딩 중...
          </div>
        ) : (
          <SavedGroupList
            items={sortedItems}
            onItemClick={(item) => {
              router.push(`/saved/${item.group_id}`);
            }}
            onDeleteClick={(item) => {
              setSelectedItem(item);
              open("delete");
            }}
            onEdit={(item) => {
              setSelectedItem(item);
              setGroupName(item.group_name);
              setSelectedIcon(item.icon);
              open("edit");
            }}
          />
        )}
      </div>

      {/* 새로운 그룹 만들기 버튼 */}
      <div className="sticky bottom-0 z-10 flex justify-center items-center pb-[38px] pt-[14px] px-[16px] bg-surface-normal-container0">
        <Button
          variant="neutral"
          className="button-l-semibold py-[16px]"
          fullWidth
          onClick={() => {
            open("create");
          }}
        >
          새로운 그룹 만들기
        </Button>
      </div>

      {/* 관련 모달 및 바텀시트 */}
      {sheet === "delete" &&
        createPortal(
          <ConfirmModal
            isOpen={sheet === "delete"}
            onClose={closeSheet}
            title="삭제할까요?"
            description={`그룹을 삭제하면 \n 저장된 가게 정보도 함께 삭제돼요`}
            leftButtonText="취소"
            rightButtonText="삭제"
            onLeftButtonClick={closeSheet}
            onRightButtonClick={async () => {
              if (!selectedItem) return;
              await deleteGroupMutation.mutateAsync(selectedItem.group_id);
              closeSheet();
            }}
          />
        )}

      {sheet === "edit" &&
        createPortal(
          <GroupWithInputBottomSheet
            title="그룹 수정"
            groupName={groupName}
            selectedColor={selectedIcon}
            onGroupNameChange={setGroupName}
            onColorSelect={setSelectedIcon}
            onClose={closeSheet}
            onDone={() => {
              closeSheet();
              showToast("그룹이 수정되었습니다");
              if (selectedItem) {
                updateGroupMutation.mutate({
                  groupId: selectedItem.group_id,
                  data: { group_name: groupName, icon: selectedIcon },
                });
              }
            }}
          />
        )}

      {sheet === "create" &&
        createPortal(
          <GroupWithInputBottomSheet
            title="새로운 그룹 만들기"
            groupName={groupName}
            selectedColor={selectedIcon}
            onGroupNameChange={setGroupName}
            onColorSelect={setSelectedIcon}
            onClose={closeSheet}
            onDone={async () => {
              if (!groupName || !selectedIcon) return;
              await createGroupMutation.mutateAsync({
                group_name: groupName,
                icon: selectedIcon,
              });
              closeSheet();
              showToast("새로운 그룹이 생성되었습니다");
            }}
          />
        )}
      <Toast
        message={toast.message}
        icon={<Icon icon="Complete" />}
        isOpen={toast.open}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
      />
    </div>
  );
}
