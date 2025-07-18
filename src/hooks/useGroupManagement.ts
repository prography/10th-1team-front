import { useCallback, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useModalStore } from "@/store/useModalStore";
import useUserStore from "@/store/useUserStore";
import { getGroup, createGroup, savePlaceGroup } from "@/apis/group";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Group, CreateGroupRequest } from "@/types/group";

interface UseGroupManagementProps {
  placeName?: string;
  enableGroupQuery?: boolean;
  placeId: string;
}

const iconColors = ["#FF5252", "#FFD600", "#7ED957", "#4FC3F7", "#BA68C8"];

export function useGroupManagement({
  placeName,
  enableGroupQuery = false,
  placeId,
}: UseGroupManagementProps) {
  const { user: userInfo } = useUserStore((state) => state);
  const isLoggedIn = !!userInfo;
  const router = useRouter();
  const openModal = useModalStore((state) => state.openModal);
  const queryClient = useQueryClient();

  // 그룹 생성 모달 상태
  const [showCreate, setShowCreate] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState(iconColors[0]);
  const [newGroup, setNewGroup] = useState<string[] | null>([]);
  const [initialSelectedCount, setInitialSelectedCount] = useState(0);
  const [hasInitialSelection, setHasInitialSelection] = useState(false);

  // 그룹 목록 조회
  const { data: groups, isLoading: isLoadingGroups } = useQuery<Group[]>({
    queryKey: ["groups", placeId],
    queryFn: () => getGroup(placeId),
    enabled: enableGroupQuery,
  });

  // 그룹 데이터가 로드되면 저장된 그룹 설정
  useEffect(() => {
    if (groups) {
      const savedGroups = groups
        .filter((group: Group) => group.is_saved)
        .map((group: Group) => group.group_id);
      setSelectedGroup(savedGroups);

      // 초기 선택 상태 설정
      if (savedGroups.length > 0) {
        setHasInitialSelection(true);
        setInitialSelectedCount(savedGroups.length);
      } else {
        setHasInitialSelection(false);
        setInitialSelectedCount(0);
      }
    }
  }, [groups]);

  // 그룹 생성 mutation
  const createGroupMutation = useMutation({
    mutationFn: ({ group_name, icon }: CreateGroupRequest) =>
      createGroup({ group_name, icon }),
    onSuccess: () => {
      // 그룹 생성 성공 시 그룹 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      setShowCreate(false);
      setGroupName("");
    },
  });

  // 그룹 생성 핸들러
  const handleCreateGroup = useCallback(() => {
    if (!groupName.trim()) return;

    createGroupMutation.mutate({
      group_name: groupName,
      icon: selectedColor,
    });
    setNewGroup([...(newGroup || []), groupName]);
  }, [groupName, selectedColor, createGroupMutation, newGroup]);

  // 그룹 생성 모달 열기
  const openCreateModal = useCallback(() => {
    setShowCreate(true);
    setGroupName("");
    setSelectedColor(iconColors[0]);
  }, []);

  // 그룹 생성 모달 닫기
  const closeCreateModal = useCallback(() => {
    setShowCreate(false);
    setGroupName("");
  }, []);

  // 색상 선택 핸들러
  const handleColorSelect = useCallback((color: string) => {
    setSelectedColor(color);
  }, []);

  // 저장하기 모달 열기 핸들러
  const onSave = useCallback(() => {
    if (!isLoggedIn) {
      openModal("login", {
        onLogin: () => {
          router.push(`/login`);
          openModal(null);
        },
      });
      return;
    }
    openModal("groupSave", {
      placeName,
      placeId,
    });
  }, [isLoggedIn, openModal, router, placeName, placeId]);

  const onSelectGroup = useCallback(
    (groupId: string) => {
      if (selectedGroup.some((g) => g === groupId)) {
        setSelectedGroup(selectedGroup.filter((g) => g !== groupId));
      } else {
        setSelectedGroup([...selectedGroup, groupId]);
      }
    },
    [selectedGroup]
  );

  const savePlaceGroupMutation = useMutation({
    mutationFn: () =>
      savePlaceGroup(decodeURIComponent(placeId), selectedGroup),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });

  const onSavePlaceGroup = useCallback(() => {
    savePlaceGroupMutation.mutate();
  }, [savePlaceGroupMutation]);

  return {
    // 그룹 데이터
    groups,
    hasGroups: (groups?.length ?? 0) > 0,
    isLoadingGroups,
    createGroupMutation,
    handleCreateGroup,
    isCreating: createGroupMutation.isPending,
    showCreate,
    openCreateModal,
    closeCreateModal,
    groupName,
    setGroupName,
    selectedColor,
    handleColorSelect,
    iconColors,
    selectedGroup,
    onSelectGroup,
    onSavePlaceGroup,
    newGroup,
    onSave,
    isLoggedIn,
    initialSelectedCount,
    hasInitialSelection,
  };
}
