import React from "react";
import Icon from "@/components/atoms/Icon/Icon";
import { useGroupManagement } from "@/hooks/useGroupManagement";
import CreateGroupModal from "./CreateGroupModal";
import GroupSaveModal from "./GroupSaveModal";
import { useModalStore } from "@/store/useModalStore";
import { savePlaceGroup } from "@/apis/group";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface PlaceSaveModalProps {
  placeName?: string;
  placeId: string;
  onClose?: () => void;
}

export default function PlaceSaveModal({
  placeName = "",
  onClose = () => {},
  placeId,
}: PlaceSaveModalProps) {
  const {
    handleCreateGroup,
    showCreate,
    openCreateModal,
    closeCreateModal,
    newGroup,
  } = useGroupManagement();

  const queryClient = useQueryClient();
  const openModal = useModalStore((state) => state.openModal);

  // 장소-그룹 저장 mutation
  const savePlaceGroupMutation = useMutation({
    mutationFn: (selectedGroups: string[]) =>
      savePlaceGroup(placeId, selectedGroups),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["PlaceGroup"] });
      queryClient.invalidateQueries({
        queryKey: ["isPlaceSaved", placeId],
      });
      queryClient.invalidateQueries({ queryKey: ["bookmarkedGroups"] });
      queryClient.invalidateQueries({ queryKey: ["bookmarkedPlaces"] });
    },
  });

  const handleSave = (selectedGroups: string[], isCancelled?: boolean) => {
    try {
      savePlaceGroupMutation.mutate(selectedGroups);
      onClose();
      if (isCancelled) {
        openModal("toast", {
          message: "저장이 취소되었습니다.",
          icon: <Icon size={24} icon="Complete" />,
        });
      } else {
        openModal("toast", {
          message: "가게가 저장되었습니다.",
          icon: <Icon size={24} icon="Complete" />,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <GroupSaveModal
        title="저장하기"
        placeName={placeName}
        placeId={placeId}
        newGroup={newGroup}
        onSave={handleSave}
        onCreateGroup={openCreateModal}
        onClose={onClose}
      />

      <CreateGroupModal
        isOpen={showCreate}
        onClose={closeCreateModal}
        onCreateGroup={handleCreateGroup}
      />
    </>
  );
}
