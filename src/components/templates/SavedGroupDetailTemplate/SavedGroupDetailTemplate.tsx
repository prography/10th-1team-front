"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
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
import { GroupDefaultListBottomSheet } from "@/components/organisms/GroupBottomSheet";
import { sortByDate, sortByName } from "@/utils/sort";
import type { PlaceInfo } from "@/types/activity";
import { useSelection, useSheetState, useSort } from "@/hooks";
import {
  useBookmarkedGroupsQuery,
  useBookmarkedPlacesQuery,
  useDeleteBookmarkedPlaceMutation,
} from "@/hooks/queries";

type SortType = "recent" | "name";

const SORT_LABELS: Record<SortType, string> = {
  recent: "최신 순",
  name: "장소명 순",
};

const sorters: Record<SortType, (arr: PlaceInfo[]) => PlaceInfo[]> = {
  recent: (arr) => sortByDate(arr, (p) => p.saved_at, "desc"),
  name: (arr) => sortByName(arr, (p) => p.place_name),
} as const;

export default function SavedGroupDetailTemplate({ id }: { id: string }) {
  const createPortal = usePortal();
  const router = useRouter();

  const { data: groups } = useBookmarkedGroupsQuery({
    queryKey: ["bookmarkedGroups"],
  });
  const { data } = useBookmarkedPlacesQuery(id);
  const { group_id, group_name, icon, total, places } = data ?? {};

  const { sortKey, setSortKey, sortedItems } = useSort<PlaceInfo, SortType>(
    places ?? [],
    sorters,
    "recent"
  );
  const { selected, setSelected, toggle, toggleAll, reset } =
    useSelection<PlaceInfo>(places ?? [], (p) => p.place_id);
  const { sheet, open, close } = useSheetState<"delete" | "move">();

  const [isEditMode, setIsEditMode] = useState(false);

  const deleteBookmarkedPlaceMutation = useDeleteBookmarkedPlaceMutation(
    group_id ?? ""
  );

  const handleDelete = async () => {
    await deleteBookmarkedPlaceMutation.mutateAsync(selected);
    reset();
    close();
  };

  return (
    <div className="flex flex-col flex-1 h-full w-full bg-surface-normal-container0">
      {/* 헤더 */}
      <div className="sticky top-0 z-10 bg-surface-normal-container0">
        <DefaultHeader
          title={isEditMode ? "편집하기" : "저장한 가게"}
          startIcon={!isEditMode && <Icon icon="Back" />}
          endIcon={isEditMode && <Icon icon="Exit" />}
          onClickStartIcon={() => router.back()}
          onClickEndIcon={() => setIsEditMode(false)}
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
                    selected.length === (places?.length ?? 0)
                      ? colors.TextIcon.OnNormal["Main 500"]
                      : undefined
                  }
                  stroke={
                    selected.length === (places?.length ?? 0)
                      ? colors.TextIcon.OnNormal.White
                      : undefined
                  }
                />
              }
              text="전체 선택"
              className="body-s-regular text-texticon-onnormal-midemp"
              gap={16}
              onClick={toggleAll}
            />
          </div>
        )}

        {/* 편집 모드 아닐 때의 상단 렌더링 */}
        {!isEditMode && (
          <>
            {/* 그룹 정보 */}
            <div className="flex flex-col px-[16px] py-[24px]">
              <Icon icon="Group" fill={icon} />
              <p className="body-l-semibold text-texticon-onnormal-highestemp mt-[12px] mb-[8px]">
                {group_name}
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
                ]}
              />
              <Button
                variant="neutral"
                className="button-s-medium py-[5px] px-[8px]"
                onClick={() => {
                  setSelected([]);
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
          selectedItems={selected}
          isEditMode={isEditMode}
          onItemClick={(item) => {
            if (isEditMode) {
              toggle(item.place_id);
            } else {
              router.push(`/place/${item.place_id}`);
            }
          }}
          onDeleteClick={(item) => {
            toggle(item.place_id);
            open("delete");
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
            disabled={selected.length === 0}
            onClick={() => {
              open("move");
            }}
          >
            이동
          </Button>
          <Button
            variant="primary"
            className="button-l-semibold py-[16px]"
            fullWidth
            disabled={selected.length === 0}
            onClick={() => {
              open("delete");
            }}
          >
            삭제
          </Button>
        </div>
      )}

      {/* 관련 모달 */}
      {sheet === "delete" &&
        createPortal(
          <AlertModal
            isOpen={sheet === "delete"}
            onClose={close}
            title="선택한 가게를 삭제할까요?"
            leftButtonText="취소"
            rightButtonText="삭제"
            onLeftButtonClick={close}
            onRightButtonClick={handleDelete}
            // isLoading={deleteBookmarkedPlaceMutation.isPending} // 필요시 주석 해제
          />
        )}

      {sheet === "move" &&
        createPortal(
          <GroupDefaultListBottomSheet
            title="그룹 선택"
            groups={groups?.groups ?? []}
            onClose={close}
            onDone={() => {
              close();
            }}
          />
        )}
    </div>
  );
}
