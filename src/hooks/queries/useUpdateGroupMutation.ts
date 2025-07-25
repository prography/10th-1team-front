import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGroup } from "@/apis/group";

export function useUpdateGroupMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      groupId,
      data,
    }: {
      groupId: string;
      data: { group_name: string; icon: string };
    }) => updateGroup(groupId, data),
    onSuccess: (_, { groupId }) => {
      queryClient.invalidateQueries({ queryKey: ["bookmarkedGroups"] });
      queryClient.invalidateQueries({
        queryKey: ["bookmarkedPlaces", groupId],
      });
    },
  });
}
