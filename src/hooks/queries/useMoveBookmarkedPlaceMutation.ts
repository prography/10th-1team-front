import { useMutation, useQueryClient } from "@tanstack/react-query";
import { moveBookmarkedPlace } from "@/apis/activity";

export function useMoveBookmarkedPlaceMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      sourceGroupId,
      targetGroupIds,
      placeIds,
    }: {
      sourceGroupId: string;
      targetGroupIds: string[];
      placeIds: string[];
    }) => moveBookmarkedPlace(sourceGroupId, targetGroupIds, placeIds),
    onSuccess: (_data, variables) => {
      // invalidate both source and all target group places
      queryClient.invalidateQueries({
        queryKey: ["bookmarkedPlaces", variables.sourceGroupId],
      });
      variables.targetGroupIds.forEach((id) => {
        queryClient.invalidateQueries({ queryKey: ["bookmarkedPlaces", id] });
      });
      queryClient.invalidateQueries({ queryKey: ["bookmarkedGroups"] });
    },
  });
}
