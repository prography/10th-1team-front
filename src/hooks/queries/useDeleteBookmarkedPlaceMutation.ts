import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBookmarkedPlace } from "@/apis/activity";

export function useDeleteBookmarkedPlaceMutation(groupId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (placeIds: string[]) =>
      deleteBookmarkedPlace(groupId, placeIds),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookmarkedPlaces", groupId],
      });
      queryClient.invalidateQueries({ queryKey: ["bookmarkedGroups"] });
    },
  });
}
