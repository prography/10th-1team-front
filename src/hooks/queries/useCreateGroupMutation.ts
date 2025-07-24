import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGroup } from "@/apis/group";

export function useCreateGroupMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarkedGroups"] });
    },
  });
}
