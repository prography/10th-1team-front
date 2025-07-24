import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGroup } from "@/apis/group";

export function useDeleteGroupMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarkedGroups"] });
    },
  });
}
