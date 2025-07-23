import React, { useState, useEffect } from "react";
import Icon from "@/components/atoms/Icon/Icon";
import { List, ListItem } from "@/components/atoms/List";
import Button from "@/components/atoms/Button/Button";
import BottomSheet from "@/components/molecules/BottomSheet/BottomSheet";
import GroupSaveModalSkeleton from "./GroupSaveModalSkeleton";
import { Group } from "@/types/group";
import { getPlaceGroup, getGroup } from "@/apis/group";
import { useQuery } from "@tanstack/react-query";

interface GroupSaveModalProps {
  title: string;
  placeName?: string;
  placeId?: string;
  newGroup?: string[] | null;
  onSave: (selectedGroups: string[], isCancelled?: boolean) => void;
  onCreateGroup?: () => void;
  onClose: () => void;
}

export default function GroupSaveModal({
  title,
  placeName,
  placeId,
  newGroup,
  onSave,
  onCreateGroup,
  onClose,
}: GroupSaveModalProps) {
  const [selectedGroup, setSelectedGroup] = useState<string[]>([]);
  const [hasInitialSelection, setHasInitialSelection] = useState(false);

  // 그룹 목록 조회
  const { data: groups, isLoading: isLoadingGroups } = useQuery<Group[]>({
    queryKey: placeId ? ["PlaceGroup", placeId] : ["Group"],
    queryFn: placeId ? () => getPlaceGroup(placeId) : () => getGroup(),
    enabled: true,
  });

  // 그룹 데이터가 로드되면 저장된 그룹 설정
  useEffect(() => {
    if (groups) {
      const savedGroups = groups
        .filter((group: Group) => group.is_saved)
        .map((group: Group) => group.group_id);
      console.log(groups);
      setSelectedGroup(savedGroups);

      // 초기 선택 상태 설정
      if (savedGroups.length > 0) {
        setHasInitialSelection(true);
      } else {
        setHasInitialSelection(false);
      }
    }
  }, [groups]);

  // 그룹 선택 토글 핸들러
  const handleSelectGroup = (groupId: string) => {
    if (selectedGroup.some((g) => g === groupId)) {
      setSelectedGroup(selectedGroup.filter((g) => g !== groupId));
    } else {
      setSelectedGroup([...selectedGroup, groupId]);
    }
  };

  // 저장 핸들러
  const handleSave = () => {
    onSave(selectedGroup);
  };

  // 저장 취소 핸들러
  const handleSaveCancel = () => {
    onSave(selectedGroup, true);
  };

  const hasGroups = (groups?.length ?? 0) > 0;

  return (
    <BottomSheet title={title} onClose={onClose}>
      <div>
        {placeName && (
          <div className="px-[16px] py-[12px] body-l-semibold text-texticon-onnormal-highestemp">
            {placeName}
          </div>
        )}
        {isLoadingGroups && <GroupSaveModalSkeleton />}

        {!isLoadingGroups && hasGroups && (
          <List as="ul" className="flex flex-col h-[168px] overflow-y-auto">
            {groups?.map((group: Group) => (
              <ListItem
                as="li"
                key={group.group_id}
                variant="place-save"
                className={`flex items-center justify-between p-[16px] cursor-pointer ${selectedGroup.includes(group.group_id) ? "bg-surface-normal-container-b50" : ""}`}
                onClick={() => handleSelectGroup(group.group_id)}
              >
                <div className="flex items-center gap-[8px]">
                  <Icon icon="Group" size={24} fill={group.icon} />
                  <span
                    className={`body-s-semibold md:max-w-none max-w-[200px] inline-block align-middle leading-none overflow-hidden text-ellipsis whitespace-nowrap ${selectedGroup.includes(group.group_id) ? "text-texticon-onnormal-main-500" : "text-texticon-onnormal-highestemp"}`}
                  >
                    {group.group_name}
                  </span>
                  <span
                    className={`caption-m-regular inline-block align-middle leading-none ${selectedGroup.includes(group.group_id) ? "text-texticon-onnormal-main-500" : "text-texticon-onnormal-lowemp"}`}
                  >
                    {group.number_of_bookmark}
                  </span>
                </div>
                <div className="flex justify-center items-center gap-[5px]">
                  {newGroup?.includes(group.group_name) && (
                    <span className="body-s-semibold text-texticon-onnormal-main-500 inline-block align-middle leading-none">
                      NEW
                    </span>
                  )}
                  {selectedGroup.includes(group.group_id) && (
                    <Icon icon="Check" size={20} fill={group.icon} />
                  )}
                </div>
              </ListItem>
            ))}
          </List>
        )}

        {!isLoadingGroups && !hasGroups && (
          <div className="flex flex-col items-center justify-center py-[34px] px-[16px] gap-[12px]">
            <Icon icon="Empty" size={40} />
            <div className="flex flex-col items-center justify-center gap-[8px]">
              <div className="body-m-semibold text-texticon-onnormal-highestemp">
                그룹이 없어요
              </div>
              <div className="caption-m-regular text-texticon-onnormal-midemp">
                그룹 생성 후 가게를 저장해주세요
              </div>
            </div>
          </div>
        )}
        <div className="px-[16px] py-[14px] mb-[24px]">
          {selectedGroup.length > 0 && (
            <Button
              variant="primary"
              fullWidth
              className="h-[56px]"
              onClick={handleSave}
            >
              저장하기
            </Button>
          )}
          {!placeName && (
            <Button
              variant="primary"
              fullWidth
              className="h-[56px]"
              onClick={handleSave}
              disabled={selectedGroup.length === 0}
            >
              완료
            </Button>
          )}

          {selectedGroup.length === 0 && hasInitialSelection && (
            <Button
              variant="primary"
              fullWidth
              className="h-[56px]"
              onClick={handleSaveCancel}
            >
              저장 취소하기
            </Button>
          )}

          {selectedGroup.length === 0 && !hasInitialSelection && placeName && (
            <Button
              variant="neutral"
              fullWidth
              className="h-[56px]"
              onClick={onCreateGroup}
            >
              새로운 그룹 만들기
            </Button>
          )}
        </div>
      </div>
    </BottomSheet>
  );
}
