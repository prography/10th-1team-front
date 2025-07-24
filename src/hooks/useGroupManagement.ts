import { useCallback, useState } from "react";
import { createGroup } from "@/apis/group";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateGroupRequest } from "@/types/group";

export function useGroupManagement() {
  const queryClient = useQueryClient();

  // 그룹 생성 모달 상태
  const [showCreate, setShowCreate] = useState(false);
  const [newGroup, setNewGroup] = useState<string[] | null>([]);

  // 그룹 생성 mutation
  const createGroupMutation = useMutation({
    mutationFn: ({ group_name, icon }: CreateGroupRequest) =>
      createGroup({ group_name, icon }),
    onSuccess: () => {
      // 그룹 생성 성공 시 그룹 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["PlaceGroup"] });
      queryClient.invalidateQueries({ queryKey: ["bookmarkedGroups"] });
      setShowCreate(false);
    },
  });

  // 그룹 생성 핸들러
  const handleCreateGroup = useCallback(
    (groupName: string, selectedColor: string) => {
      if (!groupName.trim()) return;

      createGroupMutation.mutate({
        group_name: groupName,
        icon: selectedColor,
      });
      setNewGroup([...(newGroup || []), groupName]);
    },
    [createGroupMutation, newGroup]
  );

  // 그룹 생성 모달 열기
  const openCreateModal = useCallback(() => {
    setShowCreate(true);
  }, []);

  // 그룹 생성 모달 닫기
  const closeCreateModal = useCallback(() => {
    setShowCreate(false);
  }, []);

  return {
    // 그룹 생성 mutation
    createGroupMutation,
    // 그룹 생성 핸들러
    handleCreateGroup,
    // 그룹 생성 모달 표시 여부
    showCreate,
    // 그룹 생성 모달 열기 핸들러
    openCreateModal,
    // 그룹 생성 모달 닫기 핸들러
    closeCreateModal,
    // 새로 생성된 그룹 목록
    newGroup,
  };
}
