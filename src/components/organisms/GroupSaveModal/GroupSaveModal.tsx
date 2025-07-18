import BottomSheet from "@/components/molecules/BottomSheet/BottomSheet";
import React from "react";
import Button from "@/components/atoms/Button/Button";
import Icon from "@/components/atoms/Icon/Icon";
import { useGroupManagement } from "@/hooks/useGroupManagement";
import { Group } from "@/types/group";
import { List, ListItem } from "@/components/atoms/List";
import CreateGroupModal from "./CreateGroupModal";
import GroupSaveModalSkeleton from "./GroupSaveModalSkeleton";
import { useModalStore } from "@/store/useModalStore";

interface GroupSaveModalProps {
  placeName?: string;
  placeId: string;
  onClose?: () => void;
}

export default function GroupSaveModal({
  placeName = "쌀국수 본점",
  onClose = () => {},
  placeId,
}: GroupSaveModalProps) {
  const {
    groups,
    hasGroups,
    isLoadingGroups,
    handleCreateGroup,
    isCreating,
    showCreate,
    openCreateModal,
    closeCreateModal,
    groupName,
    setGroupName,
    selectedColor,
    handleColorSelect,
    iconColors,
    onSelectGroup,
    onSavePlaceGroup,
    selectedGroup,
    newGroup,
    hasInitialSelection,
  } = useGroupManagement({
    placeName,
    enableGroupQuery: true, // 그룹 목록 조회 필요
    placeId,
  });

  const openModal = useModalStore((state) => state.openModal);

  const handleSave = () => {
    try {
      onSavePlaceGroup();
      onClose();
      openModal("toast", {
        message: "가게가 저장되었습니다.",
        icon: <Icon size={24} icon="Complete" />,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <BottomSheet title="저장하기" onClose={onClose}>
        <div>
          <div className="px-[16px] py-[12px] body-l-semibold text-texticon-onnormal-highestemp">
            {placeName}
          </div>
          {isLoadingGroups && <GroupSaveModalSkeleton />}

          {!isLoadingGroups && hasGroups && (
            <List as="ul" className="flex flex-col h-[168px] overflow-y-auto">
              {groups?.map((group: Group) => (
                <ListItem
                  as="li"
                  key={group.group_id}
                  variant="place-save"
                  className={`flex items-center justify-between p-[16px] cursor-pointer ${selectedGroup.includes(group.group_id) ? "bg-surface-normal-container-b50" : ""}`}
                  onClick={() => onSelectGroup(group.group_id)}
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

            {selectedGroup.length === 0 && hasInitialSelection && (
              <Button
                variant="primary"
                fullWidth
                className="h-[56px]"
                onClick={handleSave}
              >
                저장 취소하기
              </Button>
            )}

            {selectedGroup.length === 0 && !hasInitialSelection && (
              <Button
                variant="neutral"
                fullWidth
                className="h-[56px]"
                onClick={openCreateModal}
              >
                새로운 그룹 만들기
              </Button>
            )}
          </div>
        </div>
      </BottomSheet>

      <CreateGroupModal
        showOverlay={false}
        isOpen={showCreate}
        onClose={closeCreateModal}
        groupName={groupName}
        onGroupNameChange={setGroupName}
        selectedColor={selectedColor}
        onColorSelect={handleColorSelect}
        iconColors={iconColors}
        onCreateGroup={handleCreateGroup}
        isCreating={isCreating}
      />
    </>
  );
}
